# IBM App ID + Local Auth + Cloudant Flask App

## Overview

This Flask application implements two authentication methods and persists user profiles in IBM Cloudant:

1. **IBM App ID SSO / OIDC login** – users authenticate via IBM App ID; no password is stored for these users.
2. **Local email/password login** – users register with email and password; passwords are securely hashed with `bcrypt` and stored in Cloudant.
3. **User data storage** – both SSO and local users have profiles stored/upserted in a Cloudant database (`users` by default).

## Features

- IBM App ID (OIDC) login and user profile upsert.
- Local registration/login with bcrypt-hashed passwords.
- Session management via Flask.
- Cloudant-backed user store with metadata (created_at, last_login, source).
- Minimal template UI for login/register/home/error.

## Prerequisites

- Python 3.10+ (tested with 3.11)
- IBM Cloud account with:
  - **App ID** instance (to get CLIENT_ID, CLIENT_SECRET, and DISCOVERY_URL)
  - **Cloudant NoSQL DB** instance with IAM API key
- Git (optional)
- (Optional) Docker

## Setup

### 1. Clone / unzip project

cd your/workdir
unzip flask_appid_cloudant.zip   # or git clone if hosted
cd flask_appid_cloudant

### 2. Create & activate virtual environment

python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Unix/macOS:
source venv/bin/activate

### 3. Install dependencies

python -m pip install --upgrade pip
pip install -r requirements.txt

### 4. Configure environment

Copy the example env and edit:

copy .env.example .env          # Windows
# or
cp .env.example .env            # Unix/macOS

Edit .env and fill in real values:

# IBM App ID / OIDC
CLIENT_ID=your-appid-client-id
CLIENT_SECRET=your-appid-client-secret
REDIRECT_URI=http://localhost:5000/callback
DISCOVERY_URL=https://<region>.appid.cloud.ibm.com/oauth/v4/<tenant-id>/.well-known/openid-configuration

# Cloudant (prefer IAM API key)
CLOUDANT_URL=https://<your-cloudant-instance>.cloudantnosqldb.appdomain.cloud
CLOUDANT_APIKEY=your-cloudant-iam-api-key
CLOUDANT_DB=users

# Flask
FLASK_SECRET_KEY=<generate-with-next-step>

Generate a secure Flask secret key:

python - <<<'import secrets; print(secrets.token_hex(32))'

Paste that into FLASK_SECRET_KEY in .env.

### 5. Run the app
python app.py

Or using Flask CLI:

set FLASK_DEBUG=1               # Windows
# or export FLASK_DEBUG=1       # Unix/macOS
flask run
Visit: http://localhost:5000

### Authentication Flows

Local user
GET /register – shows registration form.
POST /register – registers new local user; password is hashed with bcrypt, user document stored in Cloudant.
GET /login_local – local login form.
POST /login_local – verifies credentials against stored hash, sets session.

App ID SSO
GET /login – redirects to IBM App ID authorization endpoint.
GET /callback – OIDC callback; exchanges code for token, fetches userinfo, upserts profile into Cloudant.

Shared
GET / – home; shows logged-in user info if authenticated.
GET /logout – clears session.

Cloudant Data Schema (example documents)

Local user
{
  "email": "user@example.com",
  "password_hash": "$2b$12$....",  // bcrypt hash
  "source": "local",
  "created_at": "2025-08-04T12:00:00Z",
  "last_login": "2025-08-04T12:05:00Z",
  "type": "user"
}

App ID user
{
  "email": "sso_user@example.com",
  "name": "Alice",
  "source": "appid",
  "userid": "oidc-subject",
  "created_at": "2025-08-04T12:30:00Z",
  "last_login": "2025-08-04T12:45:00Z",
  "type": "user"
}

Viewing users
Dashboard: Login to IBM Cloud → open Cloudant service → open the database (default users) → browse documents.
Query by email: Use the “Find” tab with selector:
{
  "selector": { "email": "user@example.com" }
}

Security Notes
Passwords are never stored in plaintext. bcrypt is used to hash local passwords.
App ID users’ passwords are not exposed or stored—the app only stores identity claims.
.env contains secrets; it is gitignored. Do not commit it.
Use HTTPS in production and secure your Cloudant IAM key.