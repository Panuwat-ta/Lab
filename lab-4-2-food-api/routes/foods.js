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

        const { search, category, maxSpicy, vegetarian, available, maxPrice, maxCookingTime, ingredient } = req.query;

        // Filtering logic
        if (search) {
            const keyword = search.toLowerCase();
            foods = foods.filter(f => 
                f.name.toLowerCase().includes(keyword) ||
                (f.description && f.description.toLowerCase().includes(keyword))
            );
        }

        if (category) {
            foods = foods.filter(f => f.category.toLowerCase() === category.toLowerCase());
        }

        if (maxSpicy) {
            foods = foods.filter(f => f.spicyLevel <= parseInt(maxSpicy));
        }

        if (vegetarian) {
            const isVeg = vegetarian.toLowerCase() === 'true';
            foods = foods.filter(f => f.vegetarian === isVeg);
        }

        if (available) {
            const isAvailable = available.toLowerCase() === 'true';
            foods = foods.filter(f => f.available === isAvailable);
        }

        if (maxPrice) {
            foods = foods.filter(f => f.price <= parseFloat(maxPrice));
        }

        if (maxCookingTime) {
            foods = foods.filter(f => f.cookingTime <= parseInt(maxCookingTime));
        }

        if (ingredient) {
            const ingLower = ingredient.toLowerCase();
            foods = foods.filter(f => f.ingredients.some(i => i.toLowerCase().includes(ingLower)));
        }

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
                maxPrice: maxPrice || null,
                maxCookingTime: maxCookingTime || null,
                ingredient: ingredient || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const id = parseInt(req.params.id);
    const food = foods.find(f => f.id === id);

    if (!food) {
        return res.status(404).json({
            success: false,
            message: `Food with ID ${id} not found`
        });
    }

    res.json({
        success: true,
        data: food
    });
});

// GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const category = req.params.category.toLowerCase();

    const filtered = foods.filter(f => f.category.toLowerCase() === category);

    res.json({
        success: true,
        data: filtered,
        total: filtered.length,
        category
    });
});

// GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
    const foods = loadFoods();
    if (foods.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No foods available'
        });
    }

    const randomIndex = Math.floor(Math.random() * foods.length);
    const food = foods[randomIndex];

    res.json({
        success: true,
        data: food
    });
});

module.exports = router;
