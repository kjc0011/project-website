document.addEventListener("DOMContentLoaded", function () {
    // 오늘 날짜 표시
    const today = new Date();
    const formattedDate = today.getFullYear() + "/" + (today.getMonth() + 1).toString().padStart(2, "0") + "/" + today.getDate().toString().padStart(2, "0");
    document.getElementById("currentDate").textContent = formattedDate;
    document.getElementById("attendance-date").textContent = formattedDate;

    // 달력 추가 (Google Calendar 사용)
    const calendarElement = document.getElementById("calendar");
    calendarElement.innerHTML = `<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&showPrint=0&showTabs=0&mode=MONTH" width="100%" height="350" frameborder="0"></iframe>`;

    // 출석 버튼 클릭 시 출석 진행률 업데이트
    const attendanceBtn = document.getElementById("attendance-btn");
    const progressFill = document.getElementById("progress-fill");
    const progressPercent = document.getElementById("progress-percent");

    let attendanceCount = 0;
    const totalDays = 30; // 한 달 기준
    let isAttended = false; // 출석 여부 체크

    attendanceBtn.addEventListener("click", function () {
        if (isAttended) {
            alert("이미 출석 완료되었습니다!");
            return; // 출석률 증가하지 않도록 여기서 함수 종료
        }

        if (attendanceCount < totalDays) {
            attendanceCount++;
            let progress = (attendanceCount / totalDays) * 100;
            progressFill.style.width = progress + "%";
            progressPercent.textContent = Math.round(progress) + "%";

            alert("출석이 완료되었습니다!");
            isAttended = true; // 출석 완료 상태로 변경
        } else {
            alert("이번 달 출석이 완료되었습니다!");
        }
    });
});
