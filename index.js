document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.querySelector(".input");
  const searchBtn = document.querySelector(".sButton");

  const stats = document.querySelector(".cardBox");
  const easyCircle = document.querySelector(".easyCircle");
  const mediumCircle = document.querySelector(".mediumCircle");
  const hardCircle = document.querySelector(".hardCircle");

  const easyValue = document.querySelector(".easyCircle .value");
  const mediumValue = document.querySelector(".mediumCircle .value");
  const hardValue = document.querySelector(".hardCircle .value");

  const nameCard = document.querySelector(".nameBox");
  const queCard = document.querySelector(".solvedBox");
  const rankCard = document.querySelector(".rankBox");
  const rateCard = document.querySelector(".acceptRate");

  /* Helper: update circle display */
  function updateCircle(circleEl, valueEl, solved, total) {
    const percent = (total === 0) ? 0 : Math.round((solved / total) * 100);
    const deg = Math.round((percent / 100) * 360);
    // set --deg as deg value
    circleEl.style.setProperty("--deg", `${deg}deg`);
    valueEl.textContent = `${solved}/${total}`;
  }

  /* Reset UI before searching */
  function resetUI() {
    // optionally hide or show; we keep visible but reset values
    nameCard.textContent = "Username: -";
    queCard.textContent = "Solved: -";
    rankCard.textContent = "Rank: -";
    rateCard.textContent = "Acceptance: -";

    updateCircle(easyCircle, easyValue, 0, 0);
    updateCircle(mediumCircle, mediumValue, 0, 0);
    updateCircle(hardCircle, hardValue, 0, 0);
  }

  function showNoData() {
    nameCard.textContent = "No user found";
    queCard.textContent = "";
    rankCard.textContent = "";
    rateCard.textContent = "";
    updateCircle(easyCircle, easyValue, 0, 0);
    updateCircle(mediumCircle, mediumValue, 0, 0);
    updateCircle(hardCircle, hardValue, 0, 0);
  }

  function isValidUsername(username) {
    if (username.trim() === "") {
      alert("Username cannot be empty!");
      resetUI();
      /* showNoData(); */
      return false;
    }
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,18}[a-zA-Z0-9]$/;
    if (!regex.test(username)) {
      alert("Invalid username!");
      resetUI();
      /* showNoData(); */
      return false;
    }
    return true;
  }

  async function fetchUserDetails(username) {
    resetUI();
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    try {
      searchBtn.textContent = "Searching...";
      searchBtn.disabled = true;

      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to fetch user details");

      const data = await response.json();
      console.log("API Response:", data);

      // handle many possible "no user" shapes
      if (!data || data.status === "error" || data.message?.toLowerCase()?.includes("user does not exist") || (data.totalSolved === 0 && data.totalQuestions === 0 && data.status !== "success")) {
        showNoData();
        return;
      }

      displayData(data, username);
    } catch (err) {
      console.error(err);
      showNoData();
    } finally {
      searchBtn.textContent = "Search";
      searchBtn.disabled = false;
    }
  }

  function displayData(data, username) {
    // show cards
    nameCard.textContent = `Username: ${username}`;
    queCard.textContent = `Total Solved: ${data.totalSolved ?? 0}/${data.totalQuestions ?? 0}`;
    rankCard.textContent = `Global Rank: ${data.ranking ?? "N/A"}`;
    rateCard.textContent = `Acceptance Rate: ${data.acceptanceRate ?? "N/A"}`;

    // update circles (use solved and totals per difficulty)
    updateCircle(easyCircle, easyValue, data.easySolved ?? 0, data.totalEasy ?? 0);
    updateCircle(mediumCircle, mediumValue, data.mediumSolved ?? 0, data.totalMedium ?? 0);
    updateCircle(hardCircle, hardValue, data.hardSolved ?? 0, data.totalHard ?? 0);
  }

  // initial reset
  resetUI();

  searchBtn.addEventListener("click", function() {
    const username = userInput.value;
    if (!isValidUsername(username)) {
      userInput.value = "";
      return;
    }
    userInput.value = "";
    fetchUserDetails(username);
  });

  // allow Enter key on input
  userInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") searchBtn.click();
  });
});
