# 🚀 Hosting School's DIY Hub on schoolsdiyhub.com (Production Blueprint)

Follow these exact steps to connect your project to your new domain and activate the **Innovation Security Node**.

## 1. 🌐 Connect Domain in Vercel
Since you bought the domain on Vercel, the connection is automated:
1. In your **Vercel Dashboard**, go to your Project.
2. Click **Settings** > **Domains**.
3. Type `schoolsdiyhub.com` and click **Add**.
4. Vercel will automatically generate the SSL (HTTPS) certificate.

## 2. 🔐 Authentication Setup (CRITICAL - FIXES SIGN-IN ERROR)
You MUST perform this step for login to work on your new domain:

### Step A: Authorized Domains
1. Go to [Firebase Console > Authentication > Settings](https://console.firebase.google.com/project/studio-1216835987-c72bd/authentication/settings).
2. Click the **"Authorized domains"** tab.
3. Click **"Add domain"**.
4. Paste `schoolsdiyhub.com` and click **Add**.
5. Also add `www.schoolsdiyhub.com` if you use the www prefix.

## 3. 🔑 Set Secure Environment Variables
In the Vercel dashboard, navigate to **Settings > Environment Variables** and ensure these keys are present:

| Key | Value |
| :--- | :--- |
| `GEMINI_API_KEY` | `AIzaSyDIzE-fwTT-5kZ31qcTl34UmwQLhZj2Fwk` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyDIzE-fwTT-5kZ31qcTl34UmwQLhZj2Fwk` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `studio-1216835987-c72bd` |

## 4. 🛰️ Set IPN Listener URL
In your **PesaPal Merchant Dashboard**, set the **IPN Listener URL**:
- **IPN URL**: `https://schoolsdiyhub.com/api/ipn`
- **Method**: `GET`

---
> **NOTE**: If you see an "Unauthorized Domain" error on the login screen, check the red diagnostic box at the bottom of the form. It will show you exactly which hostname needs to be added to the Firebase Authorized Domains list.
