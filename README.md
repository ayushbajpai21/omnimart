# 🛍️ OmniMart - Premium E-Commerce Platform

OmniMart is a modern, high-performance e-commerce application built with **React** and **Vite**. It features a stunning, elite UI with smooth animations and a robust **Hybrid Authentication** system.

## 🚀 Key Features

-   **🔐 Hybrid Authentication**:
    -   **Local Storage Auth**: Standard Sign-up and Login are handled locally for privacy and speed.
    -   **Firebase Google Auth**: Secure social login integration using Google Firebase.
-   **📦 Order History & Management**: Full checkout flow with a dedicated orders page to track past purchases.
-   **🔍 Smart Search & Filtering**: Instant search across all products and categories with dynamic category pages.
-   **💎 Premium UI/UX**: Built with Lucide Icons and Framer Motion for a smooth, high-end experience.
-   **📱 Mobile Responsive**: Optimized for every device, from mobile to desktop.
-   **🛡️ Secure Config**: Environment variables (`.env`) for protecting sensitive API keys.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **Styles**: Tailwind CSS
-   **Database/Auth**: Google Firebase & Local Storage
-   **Icons**: Lucide React
-   **Animations**: Framer Motion
-   **Toast**: React Hot Toast

## ⚙️ Local Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ayushbajpai21/omnimart.git
    cd omnimart
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Firebase credentials (refer to `.env.example`):
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run locally**:
    ```bash
    npm run dev
    ```

## ☁️ Deployment (Vercel)

This project is optimized for **Vercel**. 
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add the keys from your `.env` file to the **Project Settings > Environment Variables** section in the Vercel Dashboard.

---
Built with ❤️ by [Ayush Bajpai](https://github.com/ayushbajpai21)
