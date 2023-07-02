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
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: received_data.success ? "linear-gradient(to right, #00b09b, #96c93d)" : "red",
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
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
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
            text: "please provide name",
            duration: 3000,
            newWindow: true,
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
        }).showToast();
        return false;
    }


    if (data.email === "") {
        Toastify({
            text: "please provide email",
            duration: 3000,
            newWindow: true,
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
        }).showToast();
        return false;

    }
    if (data.password === "") {
        Toastify({
            text: "please provide password",
            duration: 3000,
            newWindow: true,
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
        }).showToast();
        return false;

    }

    if (data.password2 === "") {
        Toastify({
            text: "please confirm password",
            duration: 3000,
            newWindow: true,
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
        }).showToast();
        return false;

    }

    if (data.password != data.password2) {
        Toastify({
            text: "passwords don't match",
            duration: 3000,
            newWindow: true,
            avatar: "",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
        }).showToast();
        return false;

    }
    return true;
}



