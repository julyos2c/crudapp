import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;
const SECRET_KEY = "your-secret-key";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: 'companydb'
});

const generateToken = (user) => {
    return jwt.sign({ username: user.username } , SECRET_KEY, { expiresIn: "1h" });
};

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") { 
        const token = generateToken({ username });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err.message);
//         process.exit(1); // Stop server if DB connection fails
//     }
//     console.log("Connected to MySQL database.");
// });

app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employees";  // Ensure this matches your actual table name
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database Query Error:", err.message);
            return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
        res.json(results);
    });
});

app.post('/employees', (req, res) => {
    const { name, email, position } = req.body;

    const sql = "INSERT INTO employees (`name`, `email`, `position`) VALUES (?, ?, ?)";

    const values = [name, email, position];

    db.query(sql, values, (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})
app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM  employees WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
        res.json(results);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE employees SET `name` = ?, `email` = ?, `position` = ? WHERE ID = ?';
    const id = req.params.id;
    
    db.query(sql, [req.body.name, req.body.email, req.body.position, id], (err, result) => {
        if(err) return res.json({message: "Error inside server"});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req,res) => {
    const sql = "DELETE FROM employees WHERE ID = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({message: "Error inside server"});
        return res.json(result);
    })
})

    // const employees = "SELECT * FROM employees";
    // // db.query(sql, (err, results) => {
    // //     if (err) {
    // //         console.error("Database Query Error:", err.message);
    // //         return res.status(500).json({ message : "Internal Server Error", error: err.message });
    // //     }
    // //     res.json(results);
    // // });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})