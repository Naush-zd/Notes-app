const notescontainer= document.querySelector(".notes-container");
const btn= document.querySelector(".button");
let notes= document.querySelectorAll(".input-box");


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showNotes(){
    notescontainer.innerHTML = localStorage.getItem("notes");
}
showNotes();
function updateStorage(){
     localStorage.setItem("notes",notescontainer.innerHTML);
}
btn.addEventListener("click", ()=>{
    let inputbox= document.createElement("p");
    let img = document.createElement("img");
    inputbox.className= "input-box";
    inputbox.setAttribute("contenteditable","true");
    img.src= "image/delete.png";
    notescontainer.appendChild(inputbox).appendChild(img);
})
notescontainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName==="P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt =>{
            nt.onkeyup= function(){
                updateStorage();
            }
        })
    }

})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const mainContainer = document.querySelector(".container");

signupBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("change");
});
signinBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("change");
});

