// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"





// First Page-----------------------------------

const submitNameButton = document.getElementById("submit-name-button");
const nameInput = document.getElementById("name-input");


if(localStorage.getItem('championName')==null){
    submitNameButton.addEventListener('click',function(){
    let senderName = nameInput.value
    if(senderName){
        localStorage.setItem("championName",JSON.stringify(senderName));
        nameInput.value=""
        $('#first-page').css('display','none');

    }else{
        alert("Name Field Empty")
    }
})

}else{
    $('#first-page').css('display','none');
}


// second Page ---------------------------------------

const appSettings = {
    databaseURL: "YOUR DATABASE LINK"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ChampionListInDB = ref(database, "WeAreChampion")



const addButton = document.getElementById("button");
const receiverInputFieldEl = document.getElementById("receiver");
const messageInputFieldEl = document.getElementById("textarea");
const messageList = document.getElementById("text-list");


// sending data to dataBase------
addButton.addEventListener('click',function(){
    
    // {sender, receiver, message, likeCount, currentDate, currentTime}
    let message = messageInputFieldEl.value
    let receiver = receiverInputFieldEl.value
    let sender = localStorage.getItem("championName")
    let likeCount = 0
    let currentDate = getCurrentDate()
    let currentTime = getCurrentTime()

    if(message && receiver){
        let dataObject = {sender, receiver, message, likeCount, currentDate, currentTime}
        push(ChampionListInDB, dataObject)
        
        clearInputFields()

    }else{alert("input field is Empty!")}
    
})

// receiving data from dataBase------

onValue(ChampionListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        // clearAllMessages()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
          
            messageUploadedGenerator(currentItem[1].sender, currentItem[1].receiver, currentItem[1].message, currentItem[1].likeCount,currentItem[1].currentDate,currentItem[1].currentTime)
            console.log(currentItem[1].receiver)
                
        }    
    } else {
        messageList.innerHTML = "No items here... yet"
    }
})



// Other functions--------
function clearInputFields(){
    messageInputFieldEl.value =""
    receiverInputFieldEl.value=""
}

function clearAllMessages(){
    messageList.innerHTML=""
}

// {sender, receiver, message, likeCount, currentDate, currentTime}
function messageUploadedGenerator(sender, receiver, message, likeCount, currentDate, currentTime){
    messageList.innerHTML += `
    
    
    
    <div id="text-box">
                    <div id="text-box-top">
                        <h5 id="receiver">To ${receiver}</h5>
                        <div id="time-detail">
                            <p>${currentDate}</p>
                            <p>${currentTime}</p>
                        </div>
                    </div>
                    
                    <p id="posted-text">${message}</p>
                    <div id="text-box-bottom">
                        <h5 id="sender">From ${sender}</h5>
                        <div id="like-button">
                            <i class="fa-regular fa-heart"></i>
                            <h5 id="like-count">${likeCount}</h5>
                        </div>
                    </div>
                </div>`
}

// Create a new Date ------- 2023-09-24 02:06:50

function getCurrentDate() {
  
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 

    const formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
}

function getCurrentTime() {
  
    const currentDate = new Date();
  
    const hours = String(currentDate.getHours()).padStart(2, '0'); 
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); 
    const seconds = String(currentDate.getSeconds()).padStart(2, '0'); 

    const formattedDateTime = `${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
}







// Flow-------------------------
// save name in localStorage
// make an object containing {sender, receiver, message, likeCount}
// push it to the database
// clear all previous messages
// use reverse for loop to access data from the database
// make like button Logic


// still need to work on like count
