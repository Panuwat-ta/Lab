const http = require('http');
const url = require('url');

const PORT = 3000;

// ข้อมูลจำลอง students array
const students = [
    { id: 1, name: "Panuwat Takham", major: "วิศวกรรมซอฟต์แวร์", year: 2 },
    { id: 2, name: "Somsak Meesuk", major: "วิศวกรรมไฟฟ้า", year: 3 },
    { id: 3, name: "Anong Chaiya", major: "วิศวกรรมคอมพิวเตอร์", year: 1 }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Route GET /
    if (method === 'GET' && pathname === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: "Welcome to the Student API",
            endpoints: [
                "GET /students",
                "GET /students/:id",
                "GET /students/major/:major"
            ]
        }));
        return;
    }

    // Route GET /students
    if (method === 'GET' && pathname === '/students') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
        return;
    }

    // Route GET /students/:id
    if (method === 'GET' && pathname.startsWith('/students/')) {
        const pathParts = pathname.split('/');
        // ตรวจสอบว่าเป็น /students/:id หรือ /students/major/:major
        if (pathParts[2] && pathParts[1] === 'students' && pathParts[2] !== 'major') {
            const id = parseInt(pathParts[2]);
            const student = students.find(s => s.id === id);
            if (student) {
                res.writeHead(200);
                res.end(JSON.stringify(student));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: "Student not found" }));
            }
            return;
        }

        // Route GET /students/major/:major
        if (pathParts[2] === 'major' && pathParts[3]) {
            const major = decodeURIComponent(pathParts[3]);
            const filtered = students.filter(s => s.major === major);
            res.writeHead(200);
            res.end(JSON.stringify(filtered));
            return;
        }
    }

    // กรณี 404 Not Found
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Endpoint not found" }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
});
