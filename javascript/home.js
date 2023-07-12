// imports 
import { OpenPreloader, ClosePreloader } from "./preloader.js";
import { mobilecheck } from "./animatedbg.js";


//variables
let initialChecked = false;
let pageLoaded = false;
let taskcount = 0;
const timeline = gsap.timeline();

//initially setting light theme
const documentEl = document.documentElement;
documentEl.setAttribute('data-theme', 'light');

const updateTaskCount = () => {
    const taskCountEl = document.querySelector(".navElements span");
    taskCountEl.innerHTML = `${taskcount} tasks`
}


//functions and their calls according to their work
const CloseLoadingScreen = async () => {
    if (initialChecked && pageLoaded) {

        //applying dark theme if user already applied it
        const initalThemeCheck = window.localStorage.getItem("darkTheme")

        if (initalThemeCheck === "true") {

            await timeline
                .to('.dark-mode-icon', {
                    rotate: 360,
                    scale: 0,
                    duration: 0
                }).to('.light-mode-icon', {
                    scale: 1,
                    rotate: 360,
                    duration: 0,
                    // fill: "#000000"
                }).to('.light-mode-icon path, .svg path', {
                    fill: "#F0F3F8",

                    delay: -0,
                }).to('.about circle, .about path', {
                    stroke: "#F0F3F8",
                    delay: -0
                }).add(() => {
                    documentEl.setAttribute('data-theme', 'dark');
                })
                .to('.darkbg', {
                    scale: 1.5,
                    delay: -0.5,
                    duration: 0
                }).to('.navbar', {
                    background: "#051839",
                    duration: 0
                })
        }
        //loading screen only closed when both the values are set to true
        ClosePreloader();
        PlayAnimation();
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


    }
}

const initialCheck = async () => {
    try {
        const res = await fetch("https://vishultodoapis.onrender.com/users/islogin", { credentials: "include" });
        const data = await res.json();
        if (!data.success) {
            window.location.href = "../html/login.html"
        }
        initialChecked = true;
    } catch (error) {
        console.log(error);
    }
    CloseLoadingScreen();
}
initialCheck();

window.addEventListener("load", () => {
    pageLoaded = true;
    CloseLoadingScreen();
})

//code to load the username
const loadUserInfo = async () => {
    const res = await fetch("https://vishultodoapis.onrender.com/users/findme", { credentials: "include" });
    const data = await res.json();
    // console.log(data);
    const user = data;
    // console.log(user);
    const firstname = user.name.split(" ");
    window.localStorage.setItem("name", firstname[0]);

    const h1 = document.querySelector(".homeScreenUsername");
    if (window.localStorage.getItem("name") === null) {
        h1.innerText = `${firstname[0].toUpperCase()}`
        console.log("if statement")
    } else {
        h1.innerText = `${window.localStorage.getItem("name").toUpperCase()}`
        console.log("else statement")
    }

    //setting username and joined date in menu
    const userName = document.querySelector(".headings h1");
    const name_received = user.name;
    const name_to_send = name_received.charAt(0).toUpperCase() + name_received.slice(1);
    userName.innerHTML = name_to_send;
    const dateJoined = document.querySelector(".headings p");
    const date = new Date(user.createdAt);
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    dateJoined.innerHTML = `Joined : ${date.getDate()}  ${monthNames[date.getMonth()]}  ${date.getFullYear()}`


}
loadUserInfo();

//code to add a new task
const addTask = async (data) => {
    if (data.title === "") {
        return Toastify({
            text: "Please provide task title !",
            duration: 3000,
            newWindow: true,
            selector: mobilecheck() ? document.body : document.querySelector(".taskListContainer"),
            className: "toast-absolute",
            close: false,
            avatar: "",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#051839",
            },
        }).showToast();
    }

    Loader.open("md");
    try {

        if (data.description === "") data.description = "null";
        const res = await fetch("https://vishultodoapis.onrender.com/tasks/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
        const received_data = await res.json();

        if (!received_data.success) window.location.href = `../html/login.html?message=${received_data.message}`

        const inputs = document.querySelectorAll(".addtaskform input").forEach((e) => {
            e.value = "";
        })


        // console.log(received_data);
        Loader.close();
        // Toastify({
        //     text: received_data.message,
        //     duration: 3000,
        //     newWindow: true,
        //     avatar: "",
        //     close: true,
        //     gravity: "top", // `top` or `bottom`
        //     position: "right", // `left`, `center` or `right`
        //     stopOnFocus: true, // Prevents dismissing of toast on hover
        //     style: {
        //         background: received_data.success ? "linear-gradient(to right, #00b09b, #96c93d)" : "red",
        //     },
        // }).showToast();

        if (received_data.success) {
            loadTask();
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
// console.log(addTaskFormEl);

addTaskFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log("page reloading")
    const formData = new FormData(addTaskFormEl);
    const data = Object.fromEntries(formData);

    addTask(data);
})




//code for logout button
const logoutBtn = document.querySelector(".logoutbtn");
// console.log(logoutBtn)
logoutBtn.addEventListener("click", async () => {
    // console.log("click")
    Loader.open("md");

    try {
        const res = await fetch("https://vishultodoapis.onrender.com/users/logout", { credentials: "include" });
        const data = await res.json();
        window.localStorage.removeItem("name");
        data.success ? window.location.href = "../html/login.html" : window.location.reload();

    } catch (e) {

    }
    Loader.close();
    // console.log(data);

})


//######################################
// code for loading task
const loadTask = async () => {
    //elements needed
    const noTaskSvgEl = document.querySelector(".noTask");
    const taskListsWrapperEl = document.querySelector(".containerElementsWrapper");
    const activeTaskContainerEl = document.querySelector(".activeTask");
    const activeTaskH1El = document.querySelector(".activeTaskH1");
    const completeTaskContainerEl = document.querySelector(".completeTask");
    const compleTaskH1El = document.querySelector(".completeTaskH1");
    const taskEl = (title, description, id) => {
        return `
        <svg class="todoCheckbox" id=${id} width="14" height="14" viewBox="0 0 14 14" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path class="todoCheckbox" id=${id} fill-rule="evenodd" clip-rule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
                fill="#D9D9D9" />
            <circle class="todoCheckbox" id=${id} cx="7" cy="7" r="5" fill="#D9D9D9" />
        </svg>
        <div class="titleAndDescription">
            <h1 class="taskTitle">${title}</h1>
            <h1 class="taskDescription">${description}</h1>
        </div>
        <svg class="crossBtn" id=${id} width="48" height="48" viewBox="0 0 48 48" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g id=${id} class="crossBtn">
            <path class="crossBtn"  id=${id} d="M35.4284 35.4287L12.5713 12.5715M35.4284 12.5715L12.5713 35.4287"
                stroke="#051839" stroke-opacity="0.8" stroke-width="2.28571" stroke-linecap="round"
                stroke-linejoin="round" />
        </g>
    </svg>
       `
    }



    try {
        taskcount = 0;

        const task = await fetch("https://vishultodoapis.onrender.com/tasks/all", { credentials: "include" });
        const data = await task.json();

        //data received check
        if (!data.success) window.location.href = "../html/login.html?message=please login again";

        const tasks = data.tasks;
        //setting svg or list according to the size of the array 
        if (tasks.length === 0) {
            noTaskSvgEl.style.display = "block";
            taskListsWrapperEl.style.display = "none";
        }
        else {
            noTaskSvgEl.style.display = "none";
            taskListsWrapperEl.style.display = "block";
        }


        // setting the list again
        activeTaskContainerEl.innerHTML = "";
        completeTaskContainerEl.innerHTML = "";

        //using two arrays to store active and inactive tasks
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

        if (activeTask.length === 0) {
            activeTaskContainerEl.style.display = "none";
            activeTaskH1El.style.display = "none";
        } else {
            activeTaskContainerEl.style.display = "flex";
            activeTaskH1El.style.display = "block";
        }

        if (completedTask.length === 0) {
            completeTaskContainerEl.style.display = "none";
            compleTaskH1El.style.display = "none";
        } else {
            completeTaskContainerEl.style.display = "flex";
            compleTaskH1El.style.display = "block";
        }

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
            divEl.className = "taskDiv activeTaskDiv";
            divEl.id = element._id;
            divEl.innerHTML = taskEl(element.title, element.description === "null" ? "" : element.description, element._id);
            activeTaskContainerEl.appendChild(divEl);
            taskcount++;
        });

        completedTask.forEach(element => {
            const divEl = document.createElement('div');
            divEl.className = "taskDiv completedTaskDiv";
            divEl.id = element._id;
            divEl.innerHTML = taskEl(element.title, element.description === "null" ? "" : element.description, element._id);
            completeTaskContainerEl.appendChild(divEl);
        });

        updateTaskCount();
    } catch (error) {
        console.log(error);
    }


}

loadTask();

const container = document.querySelector(".taskListContainer");

const deleteOrUpdateTask = async (e) => {
    // console.log("button pressed");
    // console.log(e.target.className.baseVal);
    // console.log(e.target.id);

    const isDeleteButton = e.target.className.baseVal === 'crossBtn';
    const isUpdateButton = e.target.className.baseVal === 'todoCheckbox';


    if (!isDeleteButton && !isUpdateButton) {
        return
    }

    try {
        Loader.open("md");

        let res;

        if (isDeleteButton) {
            res = await fetch(`https://vishultodoapis.onrender.com/tasks/${e.target.id}`, {
                method: "DELETE",
                credentials: "include"
            });
        }
        if (isUpdateButton) {
            res = await fetch(`https://vishultodoapis.onrender.com/tasks/${e.target.id}`, {
                method: "PUT",
                credentials: "include"
            });
        }
        const received_data = await res.json();

        if (!received_data.success) window.location.reload();

        // console.log(received_data);
        Loader.close();
        loadTask();
        // Toastify({
        //     text: received_data.message,
        //     duration: 3000,
        //     newWindow: true,
        //     avatar: "",
        //     close: true,
        //     gravity: "top", // `top` or `bottom`
        //     position: "right", // `left`, `center` or `right`
        //     stopOnFocus: true, // Prevents dismissing of toast on hover
        //     style: {
        //         background: received_data.success ? "linear-gradient(to right, #00b09b, #96c93d)" : "red",
        //     },
        // }).showToast();

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


    // console.log(e.target.id);

}


container.addEventListener("click", deleteOrUpdateTask);



const loadTimeline = gsap.timeline();

const PlayAnimation = () => {
    loadTimeline.from(".navbar", {
        y: "-95%",
        duration: 1
    }).from(".leftSideContents", {
        y: "5rem",
        duration: 1,
        delay: -1,
    }).from(".taskListContainer", {
        y: "5rem",
        duration: 1,
        delay: -1,
    }).to('.krishna', {
        opacity: 0,
        delay: 8,
        duration: 1,
        // ease: "expo.out",
    }).from('.homeScreenGreetings h1 ', {
        y: "-200px",
        delay: -1,
        duration: 2,
        // ease: "expo.out",
        ease: "power1.out"
    }).from('.homeScreenGreetings p', {
        opacity: 0,
        duration: 1,
    }).to('.krishna', {
        display: "none"
    })
}

// code for navbar closing and opening
const crossBtnEl = document.querySelector(".crossbtn");
const crossBtnTimeline = gsap.timeline();
const settingBtnTimeline = gsap.timeline();

crossBtnEl.addEventListener("click", async () => {
    await crossBtnTimeline.to(".navbar", {
        y: "-92%",
        ease: "expo.out",
        duration: 1
    }).to(".navElements", {
        y: "0",
        delay: -0.5
    }).to('.setting', {
        rotate: 0,
        duration: 1,
        delay: -1
    }).to('.darkening', {
        opacity: "0",
        delay: -1

    }).to('.darkening', {
        // zIndex: -1,
        height: 0,
        duration: 0
    })
})

//code for add task button
const addTaskOpenerTimeline = gsap.timeline();
const addTaskCloserTimeline = gsap.timeline();
let addTaskDialogOpen = false;

const addTaskRaiseBtnEl = document.querySelector(".addTaskRaiseButton");

addTaskRaiseBtnEl.addEventListener("click", () => {
    if (addTaskDialogOpen) {
        addTaskDialogOpen = false;
        addTaskCloserTimeline.to('.addTask', {
            y: "9rem",
            ease: "expo.out",
        })
            .to('.addTaskRaiseButton>svg', {
                rotate: "0deg",
                delay: -0.5,
                ease: "expo.out",
            })
            .to('.addTaskTitleAndButton button', {
                y: "0rem",
                delay: -0.5,
                ease: "expo.out",
            })
            .to('.addTaskTitleAndButton button', {
                right: "0%",
                x: "0",
                delay: -0.5,
                ease: "expo.out",
            })
    }
    else {
        addTaskDialogOpen = true;
        addTaskOpenerTimeline.to('.addTask', {
            y: "0rem",
            ease: "expo.out",
        })
            .to('.addTaskRaiseButton>svg', {
                rotate: "180deg",
                delay: -0.5,
                ease: "expo.out",
            })
            .to('.addTaskTitleAndButton button', {
                y: "9rem",
                delay: -0.5,
                ease: "expo.out",
            })
            .to('.addTaskTitleAndButton button', {
                right: "50%",
                x: "50%",
                delay: -0.5,
                ease: "expo.out",

            })

    }
})


const settingBtnEl = document.querySelector(".setting");

settingBtnEl.addEventListener("click", async () => {
    await settingBtnTimeline.to('.darkening', {
        // zIndex: 999,
        height: "100%",
        duration: 0
    }).to(".navbar", {
        y: "0%",
        ease: "expo.out",
        duration: 1
    }).to(".navElements", {
        y: "-1vh",
        delay: -0.5,

    }).to('.setting', {
        rotate: 360 * 4,
        duration: 1,
        delay: -1
    }).to('.darkening', {
        opacity: "0.9",
        delay: -1

    })
})


