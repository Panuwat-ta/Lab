# Restaurant Review Website

## รายละเอียดโปรเจค
  ประกอบด้วย:
   - แบ็กเอนด์ (Node.js พร้อม Express) ที่ให้บริการ REST API
     สำหรับจัดการข้อมูลร้านอาหารและรีวิว โดยจัดเก็บไว้ในไฟล์ JSON
   - ฟรอนต์เอนด์ (React พร้อม Vite) ที่ใช้ API ของแบ็กเอนด์เพื่อแสดงรายการร้านอาหาร
     รายละเอียด และอนุญาตให้ผู้ใช้เพิ่มรีวิว

## เทคโนโลยีที่ใช้
- Frontend: React 18 + Vite
- Backend: Node.js + Express
- Database: JSON File Storage

## Features ที่ทำได้
### Required Features (70 คะแนน)
- [x] แสดงรายการร้านอาหาร
- [x] ค้นหาร้าน
- [x] กรองตามหมวด/rating/ราคา
- [x] ดูรายละเอียดร้าน
- [x] เพิ่มรีวิว
- [x] Validation
- [x] อัพเดท rating อัตโนมัติ



## วิธีติดตั้งและรัน

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## API Endpoints
- GET `/api/restaurants` - ดึงรายการร้านทั้งหมด
- GET `/api/restaurants/:id` - ดึงร้านตาม ID
- POST `/api/reviews` - เพิ่มรีวิว
- GET `/api/stats` - ดึงสถิติ

## Screenshots
### หน้าแรก
<img width="1917" height="1014" alt="image" src="https://github.com/user-attachments/assets/d325c8b5-4737-4d86-8c16-fe4a38044b54" />


### รายละเอียดร้าน
<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/3cde0b82-5bcf-481d-b8c1-1bd8cb6a25c6" />


### ฟอร์มรีวิว
<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/f5d3206b-ee5b-4891-a80a-ab40a33abd4b" />


## ผู้พัฒนา
- panuwat takham
- 67543210044-3
- panuwattakham2002@gmail.com

## License
MIT License
