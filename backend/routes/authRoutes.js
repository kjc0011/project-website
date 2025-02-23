const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config");

const router = express.Router();

// 회원가입 API
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    
    // 비밀번호 암호화
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // DB에 저장
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "회원가입 성공!" });
    });
});

module.exports = router;
