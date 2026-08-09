const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// เปิดให้เข้าถึงไฟล์ในโฟลเดอร์ public (index.html, style.css, app.js)
app.use(express.static(path.join(__dirname, 'public')));

let latestData = {
  temperature: 0,
  humidity: 0,
  updatedAt: 'ยังไม่มีข้อมูล'
};

// API สำหรับรับข้อมูลจาก ESP32
app.post('/api/data', (req, res) => {
  const { temperature, humidity } = req.body;
  latestData = {
    temperature: temperature || 0,
    humidity: humidity || 0,
    updatedAt: new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
  };
  res.status(200).json({ status: 'success' });
});

// API สำหรับส่งข้อมูลไปแสดงบนหน้าเว็บ
app.get('/api/data', (req, res) => {
  res.json(latestData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});