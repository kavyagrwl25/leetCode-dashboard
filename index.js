document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.querySelector(".input"); 
    const searchBtn = document.querySelector(".sButton"); 
    const stats = document.querySelector(".cardBox");
    const hProg = document.querySelector(".hardProgress")
    const mProg = document.querySelector(".mediumProgress")
    const eProg = document.querySelector(".easyProgress")
    const nameCard = document.querySelector(".nameBox");
    const queCard = document.querySelector(".solvedBox");
    const rankCard = document.querySelector(".rankBox");
    const rateCard = document.querySelector(".acceptRate");
    
 
    function isValidUsername(username) {
        
        if(username.trim() === ""){
            alert("Username cannot be empty!");
            stats.style.visibility = "hidden";
            stats.innerHTML = '';
            userInput.value = "";
            return false;
        }
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,18}[a-zA-Z0-9]$/;
        const isValid = regex.test(username);
        if(!isValid){
            alert("Invalid username!")
            stats.style.visibility = "hidden";
            userInput.value = "";
            stats.innerHTML = '';
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username){
        

        const url = `http://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            /* stats.innerHTML = ''; */
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the user details");
            }
            const data = await response.json();
            console.log("API Response:", data);
            if(data.status === "error" || data.message === "user does not exist"){
                showNoData();
                return ;
            }
            displayData(data, username);
        }
        catch(error){
            showNoData();
        }
        finally{
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
           
        }
    }
    function showNoData() {
    stats.style.visibility = "visible";

    nameCard.innerHTML = "No user found";
    nameCard.style.cssText = "display: flex; justify-content: center;";

    queCard.innerHTML = "";
    rankCard.innerHTML = "";
    rateCard.innerHTML = "";

    eProg.innerHTML = "Easy";
    mProg.innerHTML = "Medium";
    hProg.innerHTML = "Hard";

}



    function displayData(data, nameUsers){
        stats.style.visibility = "visible";
        const totalHardQue = data.totalHard;
        const totalMedQue = data.totalMedium;
        const totalEasyQue = data.totalEasy;
        const hardSol = data.hardSolved;
        const medSol = data.mediumSolved;
        const easySol = data.easySolved;
        const queTotal = data.totalQuestions;
        const userTotal = data.totalSolved;
        const rank = data.ranking;
        const acRate = data.acceptanceRate;

        eProg.innerHTML = `E: ${easySol}/${totalEasyQue}`;
        mProg.innerHTML = `M: ${medSol}/${totalMedQue}`;
        hProg.innerHTML = `H: ${hardSol}/${totalHardQue}`;

        nameCard.innerHTML = `Username: ${nameUsers}`;
        queCard.innerHTML = `Total Que Solved: ${userTotal}/${queTotal}`;
        rankCard.innerHTML = `Global Rank: ${rank}`;
        rateCard.innerHTML = `Acceptance Rate: ${acRate}`;
    }

    searchBtn.addEventListener('click', function() {
        const userName = userInput.value;
        if(isValidUsername(userName)){
            userInput.value = "";
            fetchUserDetails(userName);   
        }
    });
});



/* 
acceptanceRate
: 
72.28
contributionPoints
: 
830
easySolved
: 
61
hardSolved
: 
7
mediumSolved
: 
56
message
: 
"retrieved"
ranking
: 
1134185
reputation
: 
0
status
: 
"success"
submissionCalendar
: 
{1732579200: 1, 1732665600: 4, 1732838400: 4, 1732924800: 1, 1733097600: 4, 1733184000: 1, 1733356800: 2, 1733529600: 3, 1734048000: 1, 1734220800: 1, 1734912000: 6, 1735171200: 2, 1735257600: 1, 1735430400: 1, 1735689600: 2, 1744243200: 1, 1744848000: 2, 1745020800: 1, 1745107200: 1, 1745280000: 2, 1745366400: 2, 1745452800: 1, 1745539200: 1, 1745625600: 1, 1745712000: 1, 1745798400: 1, 1746748800: 1, 1746835200: 2, 1747094400: 1, 1747353600: 2, 1747440000: 1, 1747612800: 2, 1747699200: 1, 1747785600: 3, 1748390400: 2, 1748476800: 1, 1748563200: 2, 1748649600: 1, 1748736000: 1, 1752192000: 2, 1756252800: 2, 1756339200: 2, 1756425600: 1, 1756598400: 1, 1756684800: 3, 1756771200: 1, 1756857600: 1, 1756944000: 3, 1757030400: 1, 1757203200: 1, 1757289600: 1, 1757376000: 2, 1757548800: 3, 1757635200: 4, 1757721600: 9, 1757894400: 1, 1757980800: 1, 1758153600: 2, 1758240000: 3, 1758326400: 3, 1758412800: 3, 1758499200: 8, 1758585600: 4, 1758672000: 1, 1758758400: 4, 1758844800: 1, 1758931200: 2, 1759104000: 2, 1759190400: 2, 1759276800: 2, 1759363200: 4, 1759449600: 4, 1759536000: 6, 1759622400: 4, 1759708800: 1, 1759795200: 3, 1759881600: 1, 1759968000: 1, 1760054400: 10, 1760140800: 1, 1760227200: 6, 1760313600: 1, 1760400000: 1, 1760486400: 4, 1760572800: 3, 1760659200: 2, 1760745600: 10, 1760832000: 5, 1760918400: 2, 1761004800: 5, 1761091200: 2, 1761177600: 2, 1761264000: 3, 1761350400: 8, 1761436800: 1, 1761523200: 1, 1761609600: 1, 1761696000: 1, 1761782400: 3, 1761868800: 2, …}
totalEasy
: 
915
totalHard
: 
887
totalMedium
: 
1956
totalQuestions
: 
3758
totalSolved
: 
124 */