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
            /* showNoData(); */
            stats.style.visibility = "hidden";
            stats.innerHTML = '';
            userInput.value = "";
            return false;
        }
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,18}[a-zA-Z0-9]$/;
        const isValid = regex.test(username);
        if(!isValid){
            alert("Invalid username!");
            showNoData();
            
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
