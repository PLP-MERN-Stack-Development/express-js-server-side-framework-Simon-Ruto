# 🛍️ Product API — Express.js Server

A RESTful API built with **Express.js** and **MongoDB** for managing product data.  
It supports CRUD operations, filtering, pagination, search, and basic authentication using an API key.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** API Key via middleware  
- **Environment Variables:** dotenv  
- **Dev Tool:** nodemon  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-Simon-Ruto.git
cd express-js-server-side-framework-Simon-Ruto
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables  
Create a `.env` file in the root directory and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
API_KEY=mysecretkey123
```

### 4️⃣ Run the Server

**Development mode:**
```bash
npm run start
```

**or manually:**
```bash
node server.js
```

Server runs at:
```
http://localhost:3000
```

---

## 🔐 Authentication

Every protected route requires an **API key** in the request header:

| Header Key | Value |
|-------------|--------|
| `x-api-key` | `mysecretkey123` |

If missing or invalid, you’ll get:
```json
{
  "message": "Unauthorized: Invalid or missing API key"
}
```

---

## 📡 API Endpoints

### 🏠 Root
**GET /**  
Returns a welcome message.
```json
"Welcome to the Product API! Go to /api/products to see all products."
```

---

### 📋 Get All Products
**GET /api/products**

Supports:
- `category` → filter by category  
- `page` → specify page number  
- `limit` → items per page  

Example:
```
GET /api/products?category=electronics&page=1&limit=5
```

✅ Response:
```json
{
  "total": 8,
  "page": 1,
  "pages": 2,
  "products": [
    {
      "_id": "670b01d7e4f4a7a5f77e917c",
      "name": "Laptop",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 🔍 Search Products
**GET /api/products/search?q=keyword**

Search products by name (case-insensitive).

Example:
```
GET /api/products/search?q=laptop
```

✅ Response:
```json
{
  "count": 1,
  "products": [
    {
      "_id": "670b01d7e4f4a7a5f77e917c",
      "name": "Laptop",
      "category": "electronics"
    }
  ]
}
```

---

### 🧾 Get Product by ID
**GET /api/products/:id**

Example:
```
GET /api/products/670b01d7e4f4a7a5f77e917c
```

✅ Response:
```json
{
  "_id": "670b01d7e4f4a7a5f77e917c",
  "name": "Laptop",
  "price": 1200,
  "category": "electronics"
}
```

---

### ➕ Create Product
**POST /api/products**

Example Body:
```json
{
  "name": "Microwave",
  "description": "Compact oven with quick heating",
  "price": 250,
  "category": "kitchen",
  "inStock": true
}
```

✅ Response:
```json
{
  "_id": "670b01d7e4f4a7a5f77e91af",
  "name": "Microwave",
  "price": 250,
  "category": "kitchen",
  "inStock": true
}
```

---

### ✏️ Update Product
**PUT /api/products/:id**

Example Body:
```json
{
  "price": 200,
  "inStock": false
}
```

✅ Response:
```json
{
  "_id": "670b01d7e4f4a7a5f77e917c",
  "name": "Laptop",
  "price": 200,
  "inStock": false
}
```

---

### ❌ Delete Product
**DELETE /api/products/:id**

✅ Response:
```json
{
  "message": "Product deleted"
}
```

---

### 📊 Product Statistics
**GET /api/products/stats**

Returns number of products and average price per category.

✅ Response:
```json
[
  { "_id": "electronics", "totalProducts": 3, "avgPrice": 950 },
  { "_id": "kitchen", "totalProducts": 2, "avgPrice": 120 }
]
```

---

## 🧱 Middleware Used

| Middleware | Purpose |
|-------------|----------|
| `logger.js` | Logs incoming requests |
| `auth.js` | Protects routes using API key |
| `errorHandler.js` | Handles global errors gracefully |

---

## 🧪 Testing

Use **Postman** to test all endpoints.  
Make sure to always include your API key in the header:

```
x-api-key: mysecretkey123
```

---
