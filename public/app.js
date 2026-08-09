async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    
    document.getElementById('temp').innerText = data.temperature;
    document.getElementById('hum').innerText = data.humidity;
    document.getElementById('time').innerText = data.updatedAt;
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// ดึงข้อมูลใหม่ทุกๆ 3 วินาที
setInterval(fetchData, 3000);
fetchData();