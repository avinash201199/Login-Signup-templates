import os
import datetime
import requests
from flask import session
from urllib.parse import urlencode
from cloudant_client import get_users_db

_oidc_config = None

def load_oidc_config():
    global _oidc_config
    if _oidc_config is None:
        discovery = os.getenv("DISCOVERY_URL")
        _oidc_config = requests.get(discovery).json()
    return _oidc_config

def build_appid_login_url():
    cfg = load_oidc_config()
    auth_url = cfg["authorization_endpoint"]
    params = {
        "client_id": os.getenv("CLIENT_ID"),
        "response_type": "code",
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "scope": "openid email profile"
    }
    return f"{auth_url}?{urlencode(params)}"

def handle_appid_callback(code):
    cfg = load_oidc_config()
    token_url = cfg["token_endpoint"]
    userinfo_url = cfg["userinfo_endpoint"]

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "client_id": os.getenv("CLIENT_ID"),
        "client_secret": os.getenv("CLIENT_SECRET")
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    token_resp = requests.post(token_url, data=data, headers=headers)
    token_json = token_resp.json()
    access_token = token_json.get("access_token")
    if not access_token:
        raise RuntimeError("Failed to get access token from App ID")

    userinfo_resp = requests.get(userinfo_url, headers={ "Authorization": f"Bearer {access_token}"})
    user = userinfo_resp.json()

    email = user.get("email", "").strip().lower()
    if not email:
        raise RuntimeError("No email in App ID userinfo")

    session['user'] = {
        "email": email,
        "name": user.get("name") or user.get("preferred_username") or "",
        "source": "appid",
        "sub": user.get("sub")
    }

    db = get_users_db()
    selector = {'selector': {'email': email}}
    result = db.get_query_result(selector)
    docs = list(result)
    now = datetime.datetime.utcnow().isoformat() + "Z"
    if docs:
        doc = docs[0]
        doc['name'] = session['user']['name']
        doc['last_login'] = now
        doc['source'] = 'appid'
        doc.save()
    else:
        profile = {
            "email": email,
            "name": session['user']['name'],
            "source": "appid",
            "userid": user.get("sub"),
            "created_at": now,
            "last_login": now,
            "type": "user"
        }
        db.create_document(profile)
