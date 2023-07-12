// imports 
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
        //code for users just registering
        const params = new URL(location.href).searchParams;
        const mail = params.get('email');
        const name = params.get('name');
        const message = params.get('message');

        if (message) {
            setTimeout(() => {
                Toastify({
                    text: `${message}`,
                    duration: 7000,
                    delay: 10000,
                    newWindow: true,
                    // avatar: "../utils/error2.png",
                    selector: mobilecheck() ? document.body : rightcontainer,
                    className: "toast-absolute",
                    close: false,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
            }, 800);
        }

        // console.log(mail);
        if (mail && name) {
            setTimeout(() => {
                Toastify({
                    text: `${name} please login again`,
                    duration: 7000,
                    delay: 10000,
                    newWindow: true,
                    // avatar: "../utils/error2.png",
                    selector: mobilecheck() ? document.body : rightcontainer,
                    className: "toast-absolute",
                    close: false,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
            }, 800);

            document.getElementById("username").value = mail;
            document.getElementById("password").focus();
        }
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

//function to login user
//######################################################################

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

        Toastify({
            text: received_data.message,
            duration: 3000,
            newWindow: true,
            avatar: "../utils/error2.png",
            selector: mobilecheck() ? document.body : rightcontainer,
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
            selector: mobilecheck() ? document.body : rightcontainer,
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
            selector: mobilecheck() ? document.body : rightcontainer,
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

//code for register button
document.querySelector("#registerbutton").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../html/register.html"
})

// code for animations
const tl = new gsap.timeline();

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


