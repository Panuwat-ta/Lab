/**
 * ฟังก์ชันช่วยตรวจสอบอักขระพิเศษที่อันตราย
 */
const hasDangerousCharacters = (str) => {
  const dangerousPatterns = /<script|<iframe|javascript:|onerror=|onclick=/i;
  return dangerousPatterns.test(str);
};

/**
 * Middleware สำหรับตรวจสอบข้อมูลรีวิวก่อนบันทึก
 */
const validateReview = (req, res, next) => {
  const { restaurantId, userName, rating, comment } = req.body;
  const errors = [];
  
  // ========================================
  // ตัวอย่างที่ให้: ตรวจสอบ restaurantId (ครบ 100%)
  // ========================================
  if (!restaurantId) {
    errors.push('กรุณาระบุรหัสร้านอาหาร');
  } else if (isNaN(parseInt(restaurantId))) {
    errors.push('รหัสร้านต้องเป็นตัวเลข');
  } else if (parseInt(restaurantId) <= 0) {
    errors.push('รหัสร้านต้องมากกว่า 0');
  }
  
  // Validate userName
  if (!userName || !userName.trim()) {
    errors.push('กรุณากรอกชื่อ');
  } else {
    const trimmedUserName = userName.trim();
    if (trimmedUserName.length < 2) {
      errors.push('ชื่อต้องมีอย่างน้อย 2 ตัวอักษร');
    }
    if (trimmedUserName.length > 50) {
      errors.push('ชื่อต้องไม่เกิน 50 ตัวอักษร');
    }
    if (hasDangerousCharacters(trimmedUserName)) {
      errors.push('ชื่อมีอักขระที่ไม่อนุญาต');
    }
  }
  
  // Validate rating
  if (rating === undefined || rating === null || String(rating).trim() === '') {
    errors.push('กรุณาเลือกคะแนน');
  } else {
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      errors.push('คะแนนต้องอยู่ระหว่าง 1-5');
    }
  }
  
  // Validate comment
  if (!comment || !comment.trim()) {
    errors.push('กรุณากรอกความคิดเห็น');
  } else {
    const trimmedComment = comment.trim();
    if (trimmedComment.length < 10) {
      errors.push('ความคิดเห็นต้องมีอย่างน้อย 10 ตัวอักษร');
    }
    if (trimmedComment.length > 500) {
      errors.push('ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร');
    }
    if (hasDangerousCharacters(trimmedComment)) {
      errors.push('ความคิดเห็นมีอักขระที่ไม่อนุญาต');
    }
  }
  
  // ตรวจสอบว่ามี error หรือไม่
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'ข้อมูลไม่ถูกต้อง',
      errors: errors
    });
  }
  
  next();
};

module.exports = {
  validateReview
};