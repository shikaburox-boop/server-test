const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ตัวแปรเก็บข้อมูลสุขภาพของ ESP32
let latestData = {
  chipTemp: 0,
  rssi: 0,
  updatedAt: 'ยังไม่มีข้อมูล'
};

// API สำหรับรับข้อมูลจาก ESP32
app.post('/api/data', (req, res) => {
  const { chipTemp, rssi } = req.body;

  latestData = {
    chipTemp: chipTemp ? chipTemp.toFixed(1) : 0,
    rssi: rssi || 0,
    updatedAt: new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
  };

  console.log('ข้อมูลใหม่เข้า:', latestData);
  res.status(200).json({ status: 'success' });
});

// API สำหรับให้ Frontend ดึงข้อมูล
app.get('/api/data', (req, res) => {
  res.json(latestData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
