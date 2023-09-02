import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBanvAQCU7cYKpMKwdrOT3YjFdZ2W_2wWY",
  authDomain: "notes-9d6d4.firebaseapp.com",
  projectId: "notes-9d6d4",
  storageBucket: "notes-9d6d4.appspot.com",
  messagingSenderId: "944197419079",
  appId: "1:944197419079:web:b1263cb9613f9c877b7162",
  measurementId: "G-NQ13E7HTF2"
};

const app = initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const mainContainer = document.querySelector(".container");

signupBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("change");
});
signinBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("change");
});

function register(){
  console.log("Hello");
  email = getElementById("mail").value;
  password = getElementById("pwd").value;
  c_pwd = getElementById("c_pwd").value;
  username = getElementById("username").value;
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }
  console.log(email,pwd,c_pwd,username);
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      username : username,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}