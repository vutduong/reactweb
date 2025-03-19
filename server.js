const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = 'db.json';

// **User Login (Phone)**
app.post('/api/user/login', (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    const data = JSON.parse(fs.readFileSync(dbFile));
    let user = data.users.find(u => u.phone === phone);

    if (!user) {
        user = { id: data.users.length + 1, phone };
        data.users.push(user);
        fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
    }

    res.json({ message: 'Login successful', user });
});

// **Admin Login (Email & Password)**
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const data = JSON.parse(fs.readFileSync(dbFile));
    const admin = data.admins.find(a => a.email === email && a.password === password);

    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Admin login successful', admin });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
