// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');
const statusMessages = document.getElementById('statusMessages');
const apiResults = document.getElementById('apiResults');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
    setupEventListeners();
});

function initializeForms() {
    // Update rating display
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
    });
}

function setupEventListeners() {
    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitContactForm();
    });

    // Feedback form submission
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitFeedbackForm();
    });

    // TODO: เพิ่ม real-time validation สำหรับ input fields
    // ใช้ addEventListener กับ 'input' event
    const contactFields = ['name','email','phone','subject','message'];
    contactFields.forEach((field) => {
        const el = document.getElementById(field);
        if (!el) return;
        el.addEventListener('input', () => {
            const { isValid, message } = validateField(field, el.value);
            const errorEl = document.getElementById(field + 'Error');
            if (errorEl) errorEl.textContent = isValid ? '' : message;
            el.classList.toggle('valid', isValid);
            el.classList.toggle('invalid', !isValid && el.value !== '');
        });
    });

    const commentEl = document.getElementById('comment');
    if (commentEl) {
        commentEl.addEventListener('input', () => {
            const { isValid, message } = validateField('comment', commentEl.value);
            const errorEl = document.getElementById('commentError');
            if (errorEl) errorEl.textContent = isValid ? '' : message;
            commentEl.classList.toggle('valid', isValid);
            commentEl.classList.toggle('invalid', !isValid && commentEl.value !== '');
        });
    }
}

// TODO: สร้างฟังก์ชัน validateField สำหรับ client-side validation
function validateField(fieldName, value) {
    // ตรวจสอบ field แต่ละประเภท
    // return { isValid: boolean, message: string }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,10}$/;
    const v = String(value ?? '').trim();
    switch (fieldName) {
        case 'name':
            if (v.length === 0) return { isValid: false, message: 'กรุณากรอกชื่อ' };
            if (v.length < 2) return { isValid: false, message: 'อย่างน้อย 2 ตัวอักษร' };
            if (v.length > 100) return { isValid: false, message: 'ไม่เกิน 100 ตัวอักษร' };
            return { isValid: true, message: '' };
        case 'email':
            if (v.length === 0) return { isValid: false, message: 'กรุณากรอกอีเมล' };
            if (!emailRegex.test(v)) return { isValid: false, message: 'อีเมลไม่ถูกต้อง' };
            return { isValid: true, message: '' };
        case 'phone':
            if (v.length === 0) return { isValid: true, message: '' }; // optional
            if (!phoneRegex.test(v)) return { isValid: false, message: 'กรุณากรอกเบอร์ 9-10 หลัก' };
            return { isValid: true, message: '' };
        case 'subject':
            if (v.length === 0) return { isValid: false, message: 'กรุณากรอกหัวเรื่อง' };
            if (v.length < 5) return { isValid: false, message: 'อย่างน้อย 5 ตัวอักษร' };
            if (v.length > 200) return { isValid: false, message: 'ไม่เกิน 200 ตัวอักษร' };
            return { isValid: true, message: '' };
        case 'message':
            if (v.length === 0) return { isValid: false, message: 'กรุณากรอกข้อความ' };
            if (v.length < 10) return { isValid: false, message: 'อย่างน้อย 10 ตัวอักษร' };
            if (v.length > 1000) return { isValid: false, message: 'ไม่เกิน 1000 ตัวอักษร' };
            return { isValid: true, message: '' };
        case 'comment':
            if (v.length === 0) return { isValid: false, message: 'กรุณากรอกความคิดเห็น' };
            if (v.length < 5) return { isValid: false, message: 'อย่างน้อย 5 ตัวอักษร' };
            if (v.length > 500) return { isValid: false, message: 'ไม่เกิน 500 ตัวอักษร' };
            return { isValid: true, message: '' };
        default:
            return { isValid: true, message: '' };
    }
}

async function submitContactForm() {
    if (isSubmitting) return;
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    try {
        isSubmitting = true;
        updateSubmitButton('contactSubmit', 'กำลังส่ง...', true);
        
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatusMessage('✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
            contactForm.reset();
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) {
                displayValidationErrors(result.errors);
            }
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('contactSubmit', 'ส่งข้อความ', false);
    }
}

async function submitFeedbackForm() {
    if (isSubmitting) return;
    
    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);
    
    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);
        
        // TODO: ส่งข้อมูลไปยัง /api/feedback endpoint
        // ใช้ fetch API
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        // TODO: จัดการ response และแสดงผลลัพธ์
        if (result.success) {
            showStatusMessage('✅ ขอบคุณสำหรับความคิดเห็น', 'success');
            feedbackForm.reset();
            ratingValue.textContent = document.getElementById('rating').value;
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) displayValidationErrors(result.errors);
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

function showStatusMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;
    
    statusMessages.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
    const button = document.getElementById(buttonId);
    button.textContent = text;
    button.disabled = disabled;
}

function displayValidationErrors(errors) {
    errors.forEach(error => {
        showStatusMessage(`🔸 ${error}`, 'error');
    });
}

// API Testing Functions
async function loadContacts() {
    try {
        // TODO: เรียก GET /api/contact และแสดงผลลัพธ์
        apiResults.textContent = 'Loading contacts...';
        const response = await fetch('/api/contact');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading contacts: ' + error.message;
    }
}

async function loadFeedbackStats() {
    try {
        // TODO: เรียก GET /api/feedback/stats และแสดงผลลัพธ์
        apiResults.textContent = 'Loading feedback stats...';
        const response = await fetch('/api/feedback/stats');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading feedback stats: ' + error.message;
    }
}

async function loadAPIStatus() {
    try {
        // TODO: เรียก GET /api/status และแสดงผลลัพธ์
        apiResults.textContent = 'Loading API status...';
        const response = await fetch('/api/status');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API status: ' + error.message;
    }
}

async function loadAPIDocs() {
    try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API docs: ' + error.message;
    }
}