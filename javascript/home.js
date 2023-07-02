const initialCheck = async () => {
    Loader.open("md")
    try {
        const res = await fetch("https://vishultodoapis.onrender.com/users/islogin", { credentials: "include" });
        const data = await res.json();
        if (!data.success) {
            window.location.href = "../html/login.html"
        }
    } catch (error) {
        console.log(error);
    }
    Loader.close();
}
initialCheck();

//code to load the username
const loadUserInfo = async () => {
    const res = await fetch("https://vishultodoapis.onrender.com/users/findme", { credentials: "include" });
    const data = await res.json();
    // console.log(data);
    const user = data;
    // console.log(user);
    const firstname = user.name.split(" ");
    window.localStorage.setItem("name", firstname[0]);

    const h1 = document.querySelector(".h1");
    if (window.localStorage.getItem("name") === null) {
        h1.innerText = `Hello ${firstname[0]}`
        console.log("if statement")
    } else {
        h1.innerText = `hello ${window.localStorage.getItem("name")}`
        console.log("else statement")
    }

}
loadUserInfo();

//code to add a new task
const addTask = async (data) => {
    Loader.open("md");
    try {
        const res = await fetch("https://vishultodoapis.onrender.com/tasks/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
        const received_data = await res.json();
        // console.log(received_data);
        Loader.close();
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
            loadTask();
            addtaskcloser();
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

}

const addTaskFormEl = document.querySelector(".addtaskform");

addTaskFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addTaskFormEl);
    const data = Object.fromEntries(formData);
    addTask(data);
})




//code for logout button
const logoutBtn = document.querySelector(".logoutbtn");
// console.log(logoutBtn)
logoutBtn.addEventListener("click", async () => {
    console.log("click")
    const res = await fetch("https://vishultodoapis.onrender.com/users/logout", { credentials: "include" });
    const data = await res.json();
    console.log(data);
    window.localStorage.clear();
    window.location.reload();
})


//######################################
// code for loading task
const loadTask = async () => {
    try {
        const task = await fetch("https://vishultodoapis.onrender.com/tasks/all", { credentials: "include" });
        const data = await task.json();
        const tasks = data.tasks;
        // console.log(tasks);
        const container = document.querySelector(".container");
        container.innerHTML = "";
        const completedTask = new Array();
        const activeTask = new Array();

        tasks.forEach(element => {
            // console.log(element);
            if (element.isCompleted) {
                completedTask.push(element);
                // console.log("added complete task")
            }
            else {
                activeTask.push(element);
                // console.log("added active task")
            }
        })

        activeTask.sort((a, b) => {
            let da = new Date(a.createdAt),
                db = new Date(b.createdAt);
            return db - da;
        });
        completedTask.sort((a, b) => {
            let da = new Date(a.createdAt),
                db = new Date(b.createdAt);
            return db - da;
        });


        activeTask.forEach(element => {

            const divEl = document.createElement('div');
            divEl.className = "taskdiv";
            divEl.innerHTML = `<div class="tasktitle_desc"><h1>${element.title}</h1>
            <span>${element.description}</span></div> <span  class="id">${element._id}</span><button class="delete" id="${element._id}"><img src="../utils/delete.svg" id="${element._id}"></button>`
            container.appendChild(divEl);

        });
        completedTask.forEach(element => {

            const divEl = document.createElement('div');
            divEl.className = "taskdiv completed_taskdiv";
            divEl.innerHTML = `<div class="tasktitle_desc"><h1>${element.title}</h1>
            <span>${element.description}</span></div> <span  class="id">${element._id}</span><button class="delete" id="${element._id}"><img src="../utils/delete.svg" id="${element._id}"></button>`
            container.appendChild(divEl);

        });
    } catch (error) {
        console.log(error);
    }


}

loadTask();

const container = document.querySelector(".container");

const deleteTaskEvent = async (e) => {
    console.log("button pressed");

    const isButton = e.target.nodeName === 'IMG';
    if (!isButton) {
        return
    }

    try {
        Loader.open("md");
        const res = await fetch(`https://vishultodoapis.onrender.com/tasks/${e.target.id}`, {
            method: "DELETE",
            credentials: "include"
        });
        const received_data = await res.json();
        console.log(received_data);
        loadTask();
        Loader.close();
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


    console.log(e.target.id);

}


container.addEventListener("click", deleteTaskEvent);


// code for add task button 
const addTaskbtnEl = document.querySelector(".showaddtask");
const addTaskboxEl = document.querySelector(".addtask");

addTaskbtnEl.addEventListener("click", () => {
    const addtaskbuttonstatus = addTaskboxEl.getAttribute("aria-hidden");
    // console.log("click and status : " + addtaskbuttonstatus)
    if (addtaskbuttonstatus === "true") {
        addtaskopener();
    }
    else {
        addtaskcloser();
    }
})

const addtaskcloser = () => {
    addTaskboxEl.style.opacity = 0;
    addTaskboxEl.style.transform = "translate(-50%, 500%)";
    // addTaskboxEl.style.display = "none";
    addTaskboxEl.style.height = 0;

    addTaskboxEl.setAttribute("aria-hidden", "true")
}
const addtaskopener = () => {
    // addTaskboxEl.style.display = "block";
    addTaskboxEl.style.opacity = 1;
    addTaskboxEl.style.height = "min(20vh, 20vw)";
    addTaskboxEl.style.transform = "translate(-50%, -50%)";
    addTaskboxEl.setAttribute("aria-hidden", "false")
}



