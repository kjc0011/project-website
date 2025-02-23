const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("서버 정상 실행 중!");
});

app.listen(5000, () => {
    console.log("✅ 서버 실행 중! 포트: 5000");
});
