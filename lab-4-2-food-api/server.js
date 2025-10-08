const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes และ middleware
const foodRoutes = require('./routes/foods');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logger); // ใช้ logger middleware

// Root route
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            random: '/api/foods/random',
            documentation: '/api/docs'
        }
    });
});

// ใช้ foodRoutes สำหรับ '/api/foods'
app.use('/api/foods', foodRoutes);

// API Documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: "Food API Documentation",
        version: "1.0.0",
        description: "API สำหรับจัดการข้อมูลเมนูอาหาร",
        endpoints: [
            { method: "GET", path: "/api/foods", description: "เรียกดูรายการอาหารทั้งหมด พร้อม filtering query params" },
            { method: "GET", path: "/api/foods/:id", description: "เรียกดูรายละเอียดอาหารตาม ID" },
            { method: "GET", path: "/api/foods/category/:category", description: "เรียกดูอาหารตามหมวดหมู่" },
            { method: "GET", path: "/api/foods/random", description: "ดึงอาหารแบบสุ่ม 1 จาน" },
            { method: "GET", path: "/api/docs", description: "API Documentation" },
            { method: "GET", path: "/api/stats", description: "สถิติอาหาร เช่น จำนวนอาหารทั้งหมด, จำนวนแต่ละหมวด" }
        ]
    });
});

// API Stats
app.get('/api/stats', (req, res) => {
    const foods = require('./data/foods.json'); // JSON ของคุณ
    const totalFoods = foods.length;
    const categories = {};

    foods.forEach(f => {
        if (categories[f.category]) {
            categories[f.category]++;
        } else {
            categories[f.category] = 1;
        }
    });

    res.json({
        totalFoods,
        categories
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});
