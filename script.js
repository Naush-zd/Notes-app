// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBanvAQCU7cYKpMKwdrOT3YjFdZ2W_2wWY",
    authDomain: "notes-9d6d4.firebaseapp.com",
    databaseURL: "https://notes-9d6d4-default-rtdb.firebaseio.com",
    projectId: "notes-9d6d4",
    storageBucket: "notes-9d6d4.appspot.com",
    messagingSenderId: "944197419079",
    appId: "1:944197419079:web:b1263cb9613f9c877b7162",
    measurementId: "G-NQ13E7HTF2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// database
const database = getDatabase();

const loginregbtn = document.getElementById("loginregbtn");

if (localStorage.getItem("uid")) {
    loginregbtn.innerHTML = "Logout";
    loginregbtn.addEventListener("click", () => {
        localStorage.clear(); // clear all local storage
        location.reload(); // reload the page
    })
} else {
    window.location.href = "./login/login.html"; // redirect to login page
}

const notescontainer = document.querySelector(".notes-container");
const btn = document.querySelector(".button");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    get(ref(database, "users/" + localStorage.getItem("uid") + "/notes")).then((snapshot) => {
        if (snapshot.exists()) {
            notescontainer.innerHTML = snapshot.val(); // set the notes container to the value of the snapshot
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}
showNotes(); // show notes on page load


async function updateStorage() {
    await set(ref(database, "users/" + localStorage.getItem("uid") + "/notes"), notescontainer.innerHTML); // set the notes container to the database
}


btn.addEventListener("click", () => {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "image/delete.png";
    notescontainer.appendChild(inputbox).appendChild(img);
});


notescontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        remove(ref(database, "users/" + localStorage.getItem("uid") + "/notes")); // remove the note from the database
        updateStorage();
    }
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})


