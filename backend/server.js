const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("✅ 서버 실행 중! 포트: 5000");
});
