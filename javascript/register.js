import { OpenPreloader, ClosePreloader } from "./preloader.js";
import { mobilecheck } from "./animatedbg.js";

// variables 
const rightcontainer = document.querySelector(".formbg");
let initialChecked = false;
let pageLoaded = false;

//functions and their calls according to their work
const CloseLoadingScreen = () => {
    if (initialChecked && pageLoaded) {
        //loading screen only closed when both the values are set to true
        ClosePreloader();
        runAnimation();

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
    initialChecked = true;
    CloseLoadingScreen();
}

initialCheck();

window.addEventListener("load", () => {
    pageLoaded = true;
    CloseLoadingScreen();
})


const registeruser = async (data) => {
    Loader.open("md");
    try {
        const res = await fetch("https://vishultodoapis.onrender.com/users/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "include"

        })
        const received_data = await res.json();
        console.log(received_data);
        Toastify({
            text: received_data.message,
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: received_data.success ? "linear-gradient(to right, #00b09b, #96c93d)" : "#FF3333",
            },
        }).showToast();

        if (received_data.success === true) {

            window.location.href = `../html/login.html?email=${data.email}&name=${data.name.split(" ")[0]}`
        }

    } catch (error) {
        Toastify({
            text: error,
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();
    }
    Loader.close();
}

const formEl = document.querySelector(".registerform");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    // console.log(formData)
    const data = Object.fromEntries(formData);
    // console.log(data);
    const check = formCheck(data);
    if (!check) return;

    registeruser(data);

})






//check all the fields of form
const formCheck = (data) => {
    if (data.name === "") {
        Toastify({
            text: "please enter your name",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();
        return false;
    }


    if (data.email === "") {
        Toastify({
            text: "please enter your email",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();
        return false;

    }
    if (data.password === "") {
        Toastify({
            text: "please enter password",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();
        return false;

    }

    if (data.password2 === "") {
        Toastify({
            text: "please confirm password",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();
        return false;

    }

    if (data.password != data.password2) {
        Toastify({
            text: "passwords must match",
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
            className: "toast-absolute",
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF3333",
            },
        }).showToast();
        return false;

    }
    return true;
}



// code for animations

const runAnimation = () => {

    gsap.from(".imagecarosel", {
        scale: 1.3,
        y: 20,
        duration: 1.5
    })
    gsap.from(".logocontainer", {
        y: -40,
        opacity: 0,
        duration: 1.5,
        // delay: -1
    })
    gsap.from(".formbg", {
        y: -40,
        // delay: -2,
        opacity: 0,
        duration: 1.5
    })
    gsap.from(".imagecarosel-mobile", {
        y: 20,
        opacity: 0,
        scale: 1.2,
        duration: 1.5
    })

}

//code for carosel
var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    // allowSlideNext: false,
    // allowSlidePrev: false,
    allowTouchMove: false,
    loop: true,
    autoplay: {
        delay: 5000,
    },
    effect: "flip",
    flipEffect: {
        // limitRotation: false
        slideShadows: false

    }

});

//code for redirection to login page
const redirectBtnEl = document.getElementById("redirectbutton");
redirectBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../html/login.html";
})






