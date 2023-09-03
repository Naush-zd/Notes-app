// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Your web app's Firebase configuration
// TODO 1: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "Add Your Own",
    authDomain: "Add Your Own",
    projectId: "Add Your Own",
    storageBucket: "ADD YOUR OWN",
    databaseURL: "ADD YOUR OWN",
    messagingSenderId: "ADD YOUR OWN",
    appId: "ADD YOUR OWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();



const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const mainContainer = document.querySelector(".container");

const signup = document.getElementById("signup");
const signin = document.getElementById("signin");
const google = document.querySelectorAll(".google");
const facebook = document.querySelectorAll(".facebook");

signupBtn.addEventListener("click", () => {
    mainContainer.classList.toggle("change");
});
signinBtn.addEventListener("click", () => {
    mainContainer.classList.toggle("change");
});

signup.addEventListener("click", () => {
    register();
});

signin.addEventListener("click", () => {
    login();
});

google.forEach((btn) => {
    btn.addEventListener("click", () => {
        loginwithgoogle();
    });
});

facebook.forEach((btn) => {
    btn.addEventListener("click", () => {
        loginwithfacebook();
    });
});


function register() {
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("pwd").value;
    let c_pwd = document.getElementById("c_pwd").value;
    let username = document.getElementById("username").value;
    if (validate_email(mail) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }
    if (password != c_pwd) {
        alert("Passwords don't match");
        return
    }

    createUserWithEmailAndPassword(auth, mail, password).then((result) => {
        const userobj = {
            uid: result.user.uid,
            email: mail,
            username: username,
            last_login: Date.now()
        }
        set(ref(database, 'users/' + result.user.uid), userobj);
        alert("User Created!!");

    }).catch((err) => {
        console.log(err);
    });;

}

function loginwithgoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {

        const userobj = {
            uid: result.user.uid,
            email: result.user.email,
            username: result.user.displayName,
            last_login: Date.now()
        }

        await set(ref(database, 'users/' + result.user.uid), userobj);
        localStorage.setItem("uid", result.user.uid);
        window.location.href = "../index.html";
    }).catch((err) => {
        console.log(err);
        alert(err.message);
    });
}

function loginwithfacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        alert("User Logged In!!");
        localStorage.setItem("uid", result.user.uid);
        const userobj = {
            uid: result.user.uid,
            email: result.user.email,
            username: result.user.displayName,
            last_login: Date.now()
        }
        set(ref(database, 'users/' + result.user.uid), userobj);
        window.location.href = "../index.html";
    }).catch((err) => {
        console.log(err);
        alert(err.message);
    });
}

function login() {
    let mail = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    signInWithEmailAndPassword(auth, mail, password).then((result) => {
        alert("User Logged In!!");
        localStorage.setItem("uid", result.user.uid);
        window.location.href = "../index.html";
    }).catch((err) => {
        console.log(err);
        alert(err.message);
    });
}

function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/
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
    if (password < 8) {
        return false
    } else {
        return true
    }
}