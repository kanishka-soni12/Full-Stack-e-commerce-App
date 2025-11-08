Vibe Commerce – Mock E-Com Cart (Full Stack)
Overview
This is a full-stack shopping cart web application built for the Vibe Commerce Internship screening.
It demonstrates product listing, add/remove cart operations, totals, and mock checkout flow using REST APIs.

- Frontend: React (CRA)
- Backend: Node.js + Express
- Database:  Compass (local)
- Architecture: REST API
- Deployment: GitHub (no hosting required)

Features
✅ View 5–10 mock products (with images)
✅ Add to cart / update quantity / remove items
✅ View total cost dynamically
✅ Checkout with name & email → receipt modal
✅ Responsive design for mobile & desktop

Folder Structure

<img width="213" height="473" alt="image" src="https://github.com/user-attachments/assets/76431f1d-9b50-41df-b8ab-848e81c67855" />

Backend Setup

1️⃣ Prerequisites
- Node.js ≥ 18
- MongoDB running locally (mongodb://127.0.0.1:27017/mockcart)

2️⃣ Install Dependencies
    cd backend
    npm install

3️⃣ Configure Environment (.env)
    MONGO_URI=mongodb://127.0.0.1:27017/mockcart
    PORT=4000

4️⃣ Seed Sample Products
    npm run seed

5️⃣ Start Server
    npm start

Expected Output:
    ✅ Connected to MongoDB
    🚀 Server running on http://localhost:4000

API Endpoints
Endpoint	Method	Description
/api/products	GET	Fetch mock product list
/api/cart	GET	View cart contents
/api/cart	POST	Add item to cart
/api/cart/:id	DELETE	Remove cart item
/api/checkout	POST	Generate mock receipt

Example:
curl http://localhost:4000/api/products

Frontend Setup

1️⃣ Create React App (if not present)
    npx create-react-app frontend

2️⃣ Configure .env in frontend/
    REACT_APP_API_BASE=http://localhost:4000

3️⃣ Install dependencies and run
    cd frontend
    npm install
    npm start

✅ Opens on http://localhost:3000

Frontend Features

- Product Grid: displays product list with Add to Cart button
- Cart View: shows items, allows update/remove
- Checkout Form: captures name/email, shows mock receipt modal
- Responsive UI with Tailwind-style CSS

Submission Checklist

✅ GitHub repo with /backend and /frontend folders
✅ README.md (this document)
✅ Working demo video (1–2 min)
✅ MongoDB seeded with products
✅ APIs tested successfully
✅ Frontend responsive and functional
