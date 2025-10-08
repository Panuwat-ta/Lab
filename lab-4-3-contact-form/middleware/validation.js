// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ name
    // - ต้องมีค่า
    // - ต้องเป็น string
    // - ความยาวอย่างน้อย 2 ตัวอักษร
    // - ไม่เกิน 100 ตัวอักษร
    if (name === undefined || name === null || name === '') {
        errors.push('name is required');
    } else if (typeof name !== 'string') {
        errors.push('name must be a string');
    } else {
        const trimmed = name.trim();
        if (trimmed.length < 2) errors.push('name must be at least 2 characters');
        if (trimmed.length > 100) errors.push('name must be at most 100 characters');
    }
    
    // TODO: ตรวจสอบ email
    // - ต้องมีค่า  
    // - ต้องเป็น email format ที่ถูกต้อง
    // - ใช้ regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === undefined || email === null || email === '') {
        errors.push('email is required');
    } else if (typeof email !== 'string' || !emailRegex.test(String(email).trim())) {
        errors.push('email format is invalid');
    }
    
    // TODO: ตรวจสอบ subject
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 5 ตัวอักษร
    // - ไม่เกิน 200 ตัวอักษร
    if (subject === undefined || subject === null || subject === '') {
        errors.push('subject is required');
    } else if (typeof subject !== 'string') {
        errors.push('subject must be a string');
    } else {
        const trimmed = subject.trim();
        if (trimmed.length < 5) errors.push('subject must be at least 5 characters');
        if (trimmed.length > 200) errors.push('subject must be at most 200 characters');
    }
    
    // TODO: ตรวจสอบ message
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 10 ตัวอักษร
    // - ไม่เกิน 1000 ตัวอักษร
    if (message === undefined || message === null || message === '') {
        errors.push('message is required');
    } else if (typeof message !== 'string') {
        errors.push('message must be a string');
    } else {
        const trimmed = message.trim();
        if (trimmed.length < 10) errors.push('message must be at least 10 characters');
        if (trimmed.length > 1000) errors.push('message must be at most 1000 characters');
    }
    
    // TODO: ตรวจสอบ phone (optional)
    // - ถ้ามีค่า ต้องเป็นเบอร์โทรที่ถูกต้อง
    // - ใช้ regex: /^[0-9]{9,10}$/
    const phoneRegex = /^[0-9]{9,10}$/;
    if (phone !== undefined && phone !== null && phone !== '') {
        if (typeof phone !== 'string' && typeof phone !== 'number') {
            errors.push('phone must be a string of digits');
        } else {
            const phoneStr = String(phone).trim();
            if (!phoneRegex.test(phoneStr)) errors.push('phone must be 9-10 digits');
        }
    }
    
    // TODO: ตรวจสอบ company (optional)
    // - ถ้ามีค่า ต้องไม่เกิน 100 ตัวอักษร
    if (company !== undefined && company !== null && company !== '') {
        if (typeof company !== 'string') {
            errors.push('company must be a string');
        } else if (company.trim().length > 100) {
            errors.push('company must be at most 100 characters');
        }
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    // Sanitize data
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim().toLowerCase();
    req.body.subject = req.body.subject.trim();
    req.body.message = req.body.message.trim();
    
    next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ rating
    // - ต้องมีค่า
    // - ต้องเป็นตัวเลข 1-5
    const numericRating = Number(rating);
    if (rating === undefined || rating === null || rating === '') {
        errors.push('rating is required');
    } else if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
        errors.push('rating must be a number between 1 and 5');
    }
    
    // TODO: ตรวจสอบ comment
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 5 ตัวอักษร
    // - ไม่เกิน 500 ตัวอักษร
    if (comment === undefined || comment === null || comment === '') {
        errors.push('comment is required');
    } else if (typeof comment !== 'string') {
        errors.push('comment must be a string');
    } else {
        const trimmed = comment.trim();
        if (trimmed.length < 5) errors.push('comment must be at least 5 characters');
        if (trimmed.length > 500) errors.push('comment must be at most 500 characters');
    }
    
    // TODO: ตรวจสอบ email (optional)
    // - ถ้ามีค่า ต้องเป็น email format ที่ถูกต้อง
    const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== undefined && email !== null && email !== '') {
        if (typeof email !== 'string' || !emailRegex2.test(String(email).trim())) {
            errors.push('email format is invalid');
        }
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    next();
};

module.exports = {
    validateContact,
    validateFeedback
};