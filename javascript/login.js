// imports 
import { OpenPreloader, ClosePreloader } from "./preloader.js";

// variables 
const rightcontainer = document.querySelector(".formbg");
let initialChecked = false;
let pageLoaded = false;

//functions and their calls according to their work
const CloseLoadingScreen = () => {
    if (initialCheck && pageLoaded) {
        ClosePreloader();
    }
}

// code to check initially that if the user is already logged in or not
const initialCheck = async () => {
    // Loader.open("md")
    try {
        const res = await fetch("https://vishultodoapis.onrender.com/users/islogin", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
            window.location.href = "../"
        }
    } catch (error) {
        console.log(error);
    }
    // Loader.close();
    initialCheck = true;
    CloseLoadingScreen();

    const params = new URL(location.href).searchParams;
    const mail = params.get('email');
    const name = params.get('name');

    console.log(mail);
    if (mail && name) {
        Toastify({
            text: `${name} please login again`,
            duration: 10000,
            newWindow: true,
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();

    }
    document.getElementById("username").value = mail;
}

initialCheck();

window.addEventListener("load", () => {
    pageLoaded = true;
    CloseLoadingScreen();
})

//function to login user
//######################################################################
// console.log(rightcontainer);

const loginUser = async (data) => {
    const loginbtn = document.querySelector(".loginbtn");
    Loader.open("md");
    try {
        loginbtn.disabled = true;
        const res = await fetch("https://vishultodoapis.onrender.com/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const received_data = await res.json();
        // console.log(received_data);
        Toastify({
            text: received_data.message,
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: rightcontainer,
            className: "toast-absolute",
            // node: rightcontainer,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: received_data.success ? "linear-gradient(to right, #00b09b, #96c93d)" : "#FF3333",
            },
        }).showToast();

        if (received_data.success === true) {
            window.location.href = "../"
        }


    } catch (error) {
        console.log(error);

    }
    loginbtn.disabled = false;
    Loader.close();
}

const formEl = document.querySelector(".loginform");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    if (!formcheck(data)) return;
    loginUser(data);

})


const formcheck = (data) => {

    //checking if email is empty
    if (data.email === "") {
        Toastify({
            text: "please enter your email",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: rightcontainer,
            className: "toast-absolute",
            // node: rightcontainer,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();

        document.querySelector("#username").focus();
        return false;
    }

    if (data.password === "") {
        Toastify({
            text: "please enter your password",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: rightcontainer,
            className: "toast-absolute",
            // node: rightcontainer,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();

        document.querySelector("#password").focus();
        return false;
    }

    return true;

}


document.querySelector("#registerbutton").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../html/register.html"
})





