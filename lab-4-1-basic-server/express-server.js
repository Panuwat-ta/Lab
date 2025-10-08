const express = require('express');
const app = express();
const PORT = 3001;

// ข้อมูลจำลอง students array
const students = [
    { id: 1, name: "Panuwat Takham", major: "วิศวกรรมซอฟต์แวร์", year: 2 },
    { id: 2, name: "Somsak Meesuk", major: "วิศวกรรมไฟฟ้า", year: 3 },
    { id: 3, name: "Anong Chaiya", major: "วิศวกรรมคอมพิวเตอร์", year: 1 }
];

// Middleware
app.use(express.json());

// Route GET /
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Student API",
        endpoints: [
            "GET /students",
            "GET /students/:id",
            "GET /students/major/:major",
            "GET /stats"
        ]
    });
});

// Route GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// Route GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});

// Route GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const major = req.params.major;
    const filtered = students.filter(s => s.major === major);
    res.json(filtered);
});

// Route GET /stats
app.get('/stats', (req, res) => {
    const total = students.length;

    // นับจำนวนแต่ละสาขา
    const majorCounts = students.reduce((acc, s) => {
        acc[s.major] = (acc[s.major] || 0) + 1;
        return acc;
    }, {});

    res.json({
        totalStudents: total,
        studentsByMajor: majorCounts
    });
});

// Middleware จัดการ 404
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students'); 
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});
