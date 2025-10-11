import os
from flask import Flask, request, session, redirect, url_for, render_template, flash
from dotenv import load_dotenv
from auth import build_appid_login_url, handle_appid_callback
from cloudant_client import get_users_db
import bcrypt

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY") or os.urandom(32)

@app.route('/')
def home():
    if 'user' in session:
        return render_template("home.html", user=session['user'])
    return render_template("base.html")

@app.route('/login')
def login():
    return redirect(build_appid_login_url())

@app.route('/callback')
def callback():
    code = request.args.get("code")
    if not code:
        return render_template("error.html", message="Authorization code missing"), 400
    try:
        handle_appid_callback(code)
    except Exception as e:
        return render_template("error.html", message=str(e)), 500
    return redirect(url_for('home'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        if not email or not password:
            flash("Email and password required", "error")
            return redirect(url_for('register'))
        db = get_users_db()
        existing = list(db.get_query_result({'selector': {'email': email}}))
        if existing:
            flash("User already exists", "error")
            return redirect(url_for('register'))
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        now = __import__('datetime').datetime.utcnow().isoformat() + "Z"
        user_doc = {
            "email": email,
            "password_hash": hashed.decode('utf-8'),
            "source": "local",
            "created_at": now,
            "last_login": now,
            "type": "user"
        }
        db.create_document(user_doc)
        flash("Registration successful. Please log in.", "success")
        return redirect(url_for('login_local'))
    return render_template("register.html")

@app.route('/login_local', methods=['GET', 'POST'])
def login_local():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        db = get_users_db()
        result = list(db.get_query_result({'selector': {'email': email}}))
        if not result:
            flash("Invalid credentials", "error")
            return redirect(url_for('login_local'))
        user = result[0]
        stored_hash = user.get('password_hash', '').encode('utf-8')
        if bcrypt.checkpw(password.encode('utf-8'), stored_hash):
            session['user'] = {
                "email": email,
                "source": "local",
                "name": user.get("name", "")
            }
            user['last_login'] = __import__('datetime').datetime.utcnow().isoformat() + "Z"
            user.save()
            return redirect(url_for('home'))
        else:
            flash("Invalid credentials", "error")
            return redirect(url_for('login_local'))
    return render_template("login_local.html")

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
