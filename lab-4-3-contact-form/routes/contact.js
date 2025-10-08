const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// POST /api/contact - บันทึกข้อมูลติดต่อ
router.post('/', validateContact, async (req, res) => {
  try {
    const saved = await appendToJsonFile('contacts.json', req.body);
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to save contact' });
    }
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/contact - ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const all = await readJsonFile('contacts.json');
    const total = Array.isArray(all) ? all.length : 0;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = (Array.isArray(all) ? all : []).slice(start, end);
    res.json({ success: true, page, limit, total, items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;

