const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        
        // TODO: เพิ่ม query parameters สำหรับ filtering:
        // - search: ค้นหาจากชื่อหรือคำอธิบาย
        // - category: กรองตามประเภทอาหาร
        // - maxSpicy: กรองระดับความเผ็ดไม่เกินที่กำหนด
        // - vegetarian: กรองอาหารมังสวิรัติ (true/false)
        // - available: กรองอาหารที่พร้อมเสิร์ฟ (true/false)
        // - maxPrice: กรองราคาไม่เกินที่กำหนด
        
        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;
        
        // TODO: ทำ filtering logic ตาม query parameters
        
        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// TODO: GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID

// TODO: GET /api/foods/category/:category - ดึงอาหารตามประเภท

// TODO: GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน

module.exports = router;