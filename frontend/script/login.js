document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 기본 폼 제출 방지
  
      const userID = document.getElementById("userID").value;
      const password = document.getElementById("password").value;
  
      // 간단한 로그인 검증 (실제 프로젝트에서는 서버 연동 필요)
      if (userID === "admin" && password === "1234") {
        alert("로그인 성공!");
        window.location.href = "../index.html"; // 로그인 성공 시 index.html로 이동
      } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    });
  });
  