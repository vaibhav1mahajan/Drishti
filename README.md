# DRISHTI

A simple guide to run the project locally using Docker (no prior Docker knowledge required).

## What’s inside
- Backend (Bun + Express API)
- Frontend (Streamlit)
- ML service (FastAPI)
- MongoDB + OpenSearch (dev dependencies)

## Prerequisites
- Install Docker Desktop: https://www.docker.com/products/docker-desktop/
- Clone this repository.

## One-time setup
1) Create the environment file for the backend (copy/paste the block below):

```env
# File: backend/.env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB=drishti

# JWT defaults (safe for local dev only)
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d
# JWT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQwyBa6DWTm4Cx
uxxzoryFN/i4oJBScOralyY5vBbaks5IVUXzg23T4fxQ79My0hFYEUdr+m77HArJ
h6lhGWsIOxWz65Pci+OuluW8FXDHdabribMKigig/5NxfSZUBQb3olHup/MXb0WZ
XNzrqirtQZyh3XtqwwzyJvirxiuxb5QnAl2skN9RE/AsEn/1LmGIWvmkNBwga52k
LfX3FRsqG30OkOQIj6mtmTgr5NOzXYkrClVPpZ3pUuAx0pUByE62OgQVsloggY79
lTott08jwTFinoIdveTKL2kllGLl8PJOTC2ndjSjHGkdrIMfaaCPOTUjc1bygyY8
c/dJcvDxAgMBAAECggEAE1w7nVKlpu/BhDoQp55MkqPTNCqBcYCftyMg9cyLGtaJ
VoBaAWOLhVF5TERBhBgJNbw8fgR2oGERLjyfj63plPs6kwbI6qfEHYZIl4qUr/Rd
EfQhbFvKwXhfD/C5FwratfWri+qvCtnt5kAl2NEqM/ox8Kz3a7pB2OWWVpye1rb4
P3l9BxCCl8YJpsfUGOb8ABmOl6m5wid4Q6xS7WQMOf35wIOU+kKLIota1bYx7xzl
q9zG3W0NtDWgeqHOtDOl45EJ5AwJIHSPaVDVC9nRLTZypmLqzAEOpY2Bv59+GkBu
3UDbULBC38TP2/dEcv870yfBuKbOYJ6El3KhhbN3pQKBgQD+QaMBLGTg5XW5NbuC
JgKR0kQU7/WTXyKvtej9wx5yGYdEZ8n5TVE7oZAPspvwn1tsPyz5wVjdrHLCbVeW
5MEwOQQbO5XjQmceBsABQwGsYS3eISgEiUJ1DITXMytmK16HxHXFX4da3xPSmQmL
nWafGu+Z1rvLg9ZHLTOtYECBjwKBgQDSMZ8pQkQIpvKbNVLNJ5H5e5xx94xBCYuu
Y+D3jtOw9NrtWDvFrjLBGLXT6OttmXp4ASItW6QE5mWEQKxedZ4gLoYsB9T2L4TA
J+09tObw3fg5+TpCSTxfHH1rzA/WjZkvK47uIBrXxsJjhQB9lUhX8eiTGkjxg7b0
W23oDzclfwKBgCNxoveW6LkxQ6f+BZWvFsydM0B38xQIPx2fjktR1/yv8ltm3JEU
Zi6Z5ytJCtQQYv5EEFEA0xKT56uS8pLmcMf4KsphFBQKPbXB2yJR5PnS0kIU/S8k
s07938bgKzyi7xqeGIzbNFNGpczF6L69woCLkLsxZByK1GQ3uOyCbnuhAoGAOlSQ
8bc1AB2sV8wddVdU2CIokSv8XRQUEkofZTPapVHd613AAKTN6u47j1ok815TMThH
TsUOqFlztJbp/rCvOAkRLOjjfYpEUbsCyEwKhq9islvqgfim61IRsDeJ8aWL7B4v
ZP+900GSMmH3d+JUmCtGuoPh2DwQKpGw12RZjmsCgYEAx9CcEghq0N6iFyBXmSVC
2iKhSvG4OSWmGSzgxyDkRsUXat+IqRtFH8bKGtDKi+D/OlEFbqbdamwbK84qfng8
NJ+hS23vXjXtoQNsltuFG5Ef75GGqrITVwBquGqO295mzV3V+Us0MsHu2uaRsEdO
0ZsekkBNlmHFG1O7TyyRWEE=
-----END PRIVATE KEY-----
# JWT_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0MMgWug1k5uAsbscc6K8
hTf4uKCQUnDq2pcmObwW2pLOSFVF84Nt0+H8UO/TMtIRWBFHa/pu+xwKyYepYRlr
CDsVs+uT3IvjrpblvBVwx3Wm64mzCooIoP+TcX0mVAUG96JR7qfzF29FmVzc66oq
7UGcod17asMM8ib4q8YrsW+UJwJdrJDfURPwLBJ/9S5hiFr5pDQcIGudpC319xUb
Kht9DpDkCI+prZk4K+TTs12JKwpVT6Wd6VLgMdKVAchOtjoEFbJaIIGO/ZU6LbdP
I8ExYp6CHb3kyi9pJZRi5fDyTkwtp3Y0oxxpHayDH2mgjzk1I3NW8oMmPHP3SXLw
8QIDAQAB
-----END PUBLIC KEY-----
```

Notes:
- The block above already includes sample JWT keys. After pasting, remove the leading `# ` on `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` to enable them.
- In Docker, the backend connects to Mongo automatically.
- Locally (without Docker), the backend connects to your local Mongo on port 27017.

## Run with Docker (recommended)
From the project root directory:

```bash
docker compose up -d --build
```

This will start all services in the background. First run can take a few minutes.

### Open the apps
- Backend API: http://localhost:5050/ping
- OpenAPI docs (static viewer): http://localhost:8081
- Frontend (Streamlit): http://localhost:8501
- ML service (FastAPI): http://localhost:8000
- OpenSearch: http://localhost:9200 (dev only)

### See logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f ml
```

### Stop everything
```bash
docker compose down
```

## JWT signing keys (required for auth flows)
You can run the stack without keys, but auth routes (login/refresh) need RSA keys. You have two easy options. Both work on Windows, macOS, and Linux.

Option A — Use key files (recommended)
1) Generate keys into `backend/keys/`:
   - Windows PowerShell:
     ```powershell
     mkdir backend/keys -ea 0 | Out-Null
     openssl genrsa -out backend/keys/jwtRS256.key 2048
     openssl rsa -in backend/keys/jwtRS256.key -pubout -out backend/keys/jwtRS256.key.pub
     ```
     If `openssl` is not found, install via Git for Windows (includes OpenSSL) or install OpenSSL separately, or run these commands in WSL/Git Bash.

   - macOS/Linux:
     ```bash
     mkdir -p backend/keys
     openssl genrsa -out backend/keys/jwtRS256.key 2048
     openssl rsa -in backend/keys/jwtRS256.key -pubout -out backend/keys/jwtRS256.key.pub
     ```

2) Add these lines to `backend/.env`:
   ```env
   JWT_PRIVATE_KEY_PATH=keys/jwtRS256.key
   JWT_PUBLIC_KEY_PATH=keys/jwtRS256.key.pub
   ```

Option B — Paste PEMs directly in .env
```env
# Replace with your actual PEM contents (including the BEGIN/END lines)
JWT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
JWT_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----
```
Tip: escape newlines as `\n` in `.env`. Files (Option A) are usually easier.

Quick copy-paste scripts to generate keys and inject inline PEMs into `.env`

- Windows PowerShell
```powershell
# 1) Generate keys
mkdir backend/keys -ea 0 | Out-Null
openssl genrsa -out backend/keys/jwtRS256.key 2048
openssl rsa -in backend/keys/jwtRS256.key -pubout -out backend/keys/jwtRS256.key.pub

# 2) Append inline PEMs to backend/.env (escape CRLF to \n)
if (!(Test-Path backend/.env)) { New-Item backend/.env -ItemType File | Out-Null }
$priv = (Get-Content backend/keys/jwtRS256.key -Raw).Replace("`r`n","\n")
$pub  = (Get-Content backend/keys/jwtRS256.key.pub -Raw).Replace("`r`n","\n")
Add-Content backend/.env "JWT_PRIVATE_KEY=$priv"
Add-Content backend/.env "JWT_PUBLIC_KEY=$pub"
```

- macOS/Linux (bash/zsh)
```bash
# 1) Generate keys
mkdir -p backend/keys
openssl genrsa -out backend/keys/jwtRS256.key 2048
openssl rsa -in backend/keys/jwtRS256.key -pubout -out backend/keys/jwtRS256.key.pub

# 2) Append inline PEMs to backend/.env (escape to single-line with \n)
touch backend/.env
priv=$(awk 'BEGIN{RS="\0";ORS="\\n"} {gsub(/\r/,""); print}' backend/keys/jwtRS256.key)
pub=$(awk 'BEGIN{RS="\0";ORS="\\n"} {gsub(/\r/,""); print}' backend/keys/jwtRS256.key.pub)
printf "JWT_PRIVATE_KEY=%s\nJWT_PUBLIC_KEY=%s\n" "$priv" "$pub" >> backend/.env
```

## Run locally without Docker (optional)
Use this only if you prefer running services directly.

1) Start MongoDB locally (port 27017).
2) Backend:
```bash
cd backend
bun --hot src/index.ts
```
Open http://localhost:5050/ping

3) Frontend:
```bash
cd frontend
pip install -r requirements.txt
streamlit run app.py
```
Open http://localhost:8501

4) ML service:
```bash
cd ml
pip install -r requirements.txt
uvicorn service:app --reload --port 8000
```
Open http://localhost:8000

## Troubleshooting
- Backend can’t connect to Mongo in Docker:
  - Ensure you started with `docker compose up -d --build`.
  - Check logs: `docker compose logs backend`.
  - Compose sets `MONGO_URI=mongodb://mongo:27017` for the backend container.

- Curl to backend fails:
  - Try: `curl http://127.0.0.1:5050/ping`
  - Make sure the backend logs show: `API on http://0.0.0.0:5050`.

- Frontend can’t reach backend:
  - In Docker, frontend uses `http://backend:5050` automatically (configured in compose).
  - From your browser, use `http://localhost:8501` to open the UI.

If you get stuck, share the last 50 lines of `docker compose logs backend` in your message.