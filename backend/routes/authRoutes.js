const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config");

const router = express.Router();

// 🔹 회원가입 API
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    console.log("📢 [회원가입 요청 수신]", { username, email, password });

    if (!username || !email || !password) {
        console.error("❌ [회원가입 실패] 필수 입력값 없음!");
        return res.status(400).json({ message: "모든 필드를 입력해주세요!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO members (username, email, pw) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error("❌ [회원가입 실패] MySQL 오류:", err);
            return res.status(500).json({ message: "회원가입 실패", error: err });
        }
        console.log("✅ [회원가입 성공] ID:", result.insertId);
        res.json({ message: "회원가입 성공!" });
    });
});

// 🔹 로그인 API
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요!" });
    }

    const sql = "SELECT * FROM members WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ message: "서버 오류", error: err });

        if (results.length === 0) {
            return res.status(400).json({ message: "아이디가 존재하지 않습니다!" });
        }

        const user = results[0];

        // 입력한 비밀번호와 DB의 해시된 비밀번호 비교
        const isPasswordMatch = bcrypt.compareSync(password, user.pw);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "비밀번호가 일치하지 않습니다!" });
        }

        res.json({ message: "로그인 성공!", userId: user.id });
    });
});

module.exports = router;
