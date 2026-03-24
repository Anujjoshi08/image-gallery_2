# 📸 High-Performance Image Gallery (React)

## 🚀 Overview

This project is a **high-performance image gallery** built using React, focusing on optimizing rendering and heavy image processing.

It demonstrates advanced frontend concepts like:
- Virtualization (react-window)
- Web Workers
- Canvas-based image processing

---

## 🎯 Features

- 🖼️ Display 100+ images from API  
- ⚡ Smooth scrolling using virtualization  
- 🔍 Full-screen image preview modal  
- ✅ Select individual or multiple images  
- 📥 Download single or multiple images  
- 🖊️ Watermark added before download  
- 🧵 Background image processing using Web Workers  

---

## 🏗️ Tech Stack

- Frontend: React.js  
- Virtualization: react-window  
- Image Processing: Canvas API  
- Multithreading: Web Workers  
- Styling: Tailwind CSS  

---

## 📂 Project Structure

src/
│
├── components/
│ ├── Gallery.jsx
│ ├── ImageCard.jsx
│ ├── PreviewModal.jsx
│
├── workers/
│ └── imageWorker.js
│
├── utils/
│ └── watermark.js
│
├── App.jsx
└── main.jsx

---

## ⚡ Performance Optimizations

### 1️⃣ Virtualization (react-window)

- Used FixedSizeGrid to render only visible images  
- Reduces DOM nodes significantly  
- Ensures smooth scrolling  

---

### 2️⃣ Web Workers

- Image processing runs in a separate thread  
- Prevents blocking the main UI thread  
- Improves responsiveness  

---

### 3️⃣ OffscreenCanvas

- Used inside Web Worker  
- Enables efficient image processing  

---

## 🧠 How It Works

### 📌 Image Rendering

- Images are fetched from an API  
- Only visible images are rendered using virtualization  

---

### 📌 Image Download Flow

1. User clicks download  
2. Image URL is sent to Web Worker  
3. Worker processes the image:
   - Fetches image  
   - Converts to bitmap  
   - Draws on OffscreenCanvas  
   - Adds watermark  
4. Final image blob is returned  
5. Image is downloaded  

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to project
cd your-repo-name

# Install dependencies
npm install

# Run the app
npm run dev