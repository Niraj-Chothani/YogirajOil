# 🚀 Production Deployment Instructions

## ✅ What I Fixed

Your website [https://yogiraj-oil.vercel.app/](https://yogiraj-oil.vercel.app/) was trying to connect to `localhost:8081` which doesn't exist in production. I've fixed this by:

### 1. **Created Serverless API Function**
- Added `api/contact.js` - Vercel serverless function for handling contact form
- Same SMTP logic with multiple configuration attempts
- Proper CORS headers for frontend requests

### 2. **Environment-Aware Frontend**
- Created `src/lib/api.ts` - Smart API configuration
- **Development**: Uses `http://localhost:8081`
- **Production**: Uses `https://yogiraj-oil.vercel.app`

### 3. **Updated Contact Form**
- Now uses the centralized API configuration
- Better error handling and TypeScript support

## 🔧 **Setup Environment Variables in Vercel**

You need to add your Gmail credentials to Vercel:

### **Step 1: Get Gmail App Password**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → App passwords
3. Generate password for "Mail"
4. Copy the 16-character password

### **Step 2: Add Environment Variables in Vercel**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `yogiraj-oil` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
EMAIL_USER = nirajchothani50@gmail.com
EMAIL_PASS = your-16-character-app-password
EMAIL_TO = nirajchothani50@gmail.com
```

### **Step 3: Redeploy**
After adding environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger auto-deployment

## 🧪 **Testing**

### **Development (Local)**
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8081`

### **Production**
- Website: [https://yogiraj-oil.vercel.app/](https://yogiraj-oil.vercel.app/)
- API: `https://yogiraj-oil.vercel.app/api/contact`

## 📁 **New File Structure**

```
YogirajOil/
├── api/
│   └── contact.js          # Vercel serverless function
├── src/
│   ├── lib/
│   │   └── api.ts          # Environment-aware API config
│   └── pages/
│       └── Contact.tsx     # Updated to use new API
├── server/
│   └── index.js           # Local development server
├── vercel.json            # Vercel configuration
└── package.json           # Updated scripts
```

## 🔄 **How It Works**

### **Development Mode**
- `npm run dev` runs both frontend (Vite) and backend (Express)
- Contact form → `http://localhost:8081/api/contact`

### **Production Mode**
- Frontend deployed to Vercel
- Contact form → `https://yogiraj-oil.vercel.app/api/contact`
- Serverless function handles email sending

## 🚨 **Important Notes**

1. **Environment Variables**: Must be set in Vercel Dashboard
2. **App Password**: Required for Gmail SMTP (not regular password)
3. **CORS**: Already configured for your domain
4. **Timeout**: Set to 30 seconds for email sending

## ✅ **Next Steps**

1. **Add environment variables** in Vercel Dashboard
2. **Redeploy** your site
3. **Test contact form** on production site
4. **Check Vercel Functions logs** if issues persist

Your contact form should now work perfectly in production! 🎉
