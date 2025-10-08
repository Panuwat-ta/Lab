const express = require('express');
const router = express.Router();
const { validateFeedback } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
  try {
    const saved = await appendToJsonFile('feedback.json', req.body);
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to save feedback' });
    }
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/feedback/stats - ดึงสถิติความคิดเห็น
router.get('/stats', async (req, res) => {
  try {
    const items = await readJsonFile('feedback.json');
    const total = Array.isArray(items) ? items.length : 0;
    const ratings = (Array.isArray(items) ? items : []).map(it => Number(it.rating)).filter(n => Number.isFinite(n));
    const sum = ratings.reduce((a, b) => a + b, 0);
    const average = total > 0 ? parseFloat((sum / total).toFixed(2)) : 0;
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(r => { if (distribution[r] !== undefined) distribution[r] += 1; });
    res.json({ success: true, total, average, distribution });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;

