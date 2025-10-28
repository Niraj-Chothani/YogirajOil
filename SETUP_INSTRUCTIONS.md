# YogirajOil Full-Stack Setup Instructions

## 🚀 Quick Start

Now you can run both frontend and backend together with a single command:

```bash
npm run dev
```

This will start:
- **Frontend (Vite React)** on `http://localhost:5173`
- **Backend (Express)** on `http://localhost:8081`

## 📧 Fix Email Configuration (REQUIRED)

Your server is still failing because Gmail requires **App Passwords** instead of regular passwords.

### Step 1: Generate Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. Under "2-Step Verification", click **App passwords**
5. Select **Mail** as app and **Other** as device
6. Enter "YogirajOil Contact Form" as device name
7. Click **Generate**
8. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

### Step 2: Update Your .env File

Replace your current `.env` file content with:

```env
# Gmail SMTP Configuration (USE APP PASSWORD!)
EMAIL_USER=nirajchothani50@gmail.com
EMAIL_PASS=your-16-character-app-password-here
EMAIL_TO=nirajchothani50@gmail.com

# Server Configuration
PORT=8081
FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANT:** Replace `your-16-character-app-password-here` with the actual App Password from Step 1.

## 🛠️ Available Scripts

- `npm run dev` - Run both frontend and backend together
- `npm run client:dev` - Run only frontend (Vite)
- `npm run server:dev` - Run only backend (Express with nodemon)
- `npm run build` - Build frontend for production
- `npm start` - Run backend in production mode

## 🔧 What I Fixed

### 1. **Project Structure**
- Moved server code to `server/` directory
- Created proper full-stack setup

### 2. **Enhanced SMTP Configuration**
- Added multiple SMTP configuration attempts
- Better error handling with specific messages
- Improved email templates with styling
- Added connection verification

### 3. **Concurrent Development**
- Added `concurrently` to run both servers together
- Added `nodemon` for auto-restart on server changes
- Updated package.json scripts

### 4. **Better Error Messages**
- Specific error messages for authentication failures
- Clear instructions for App Password setup
- Connection status logging

## 🧪 Testing

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Check server status:**
   - Visit `http://localhost:8081/api/health`
   - Should return: `{"status": "Server is running!", "timestamp": "..."}`

3. **Test contact form:**
   - Go to your React app contact page
   - Fill out and submit the form
   - Check server console for success/error messages

## 🚨 Troubleshooting

### Still getting SMTP errors?
1. **Double-check App Password:** Make sure you're using the 16-character App Password, not your regular Gmail password
2. **Check 2FA:** Gmail App Passwords require 2-Factor Authentication to be enabled
3. **Verify email:** Make sure `EMAIL_USER` is the correct Gmail address

### Frontend not connecting to backend?
1. **Check CORS:** The server is configured to accept requests from `http://localhost:5173`
2. **Update Contact.tsx:** Make sure your frontend is making requests to `http://localhost:8081/api/contact`

### Port conflicts?
- Frontend: Change port in `vite.config.ts`
- Backend: Change `PORT` in `.env` file

## 🔒 Security Notes

- Never commit your `.env` file to version control
- App Passwords are more secure than regular passwords
- You can revoke App Passwords anytime from Google Account settings

## 📞 Need Help?

If you're still having issues:
1. Check the server console for detailed error messages
2. Verify your Gmail App Password is correctly set
3. Make sure both servers are running on different ports
4. Test the `/api/health` endpoint first

---

**Ready to go!** Run `npm run dev` and both your frontend and backend will start together! 🎉
