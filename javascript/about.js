import { ClosePreloader } from "./preloader.js";

window.addEventListener("load", () => {
    ClosePreloader();
})

const timeline = gsap.timeline();

timeline.from('.mainlogo', {
    opacity: 0,
    y: "-4rem",
    duration: 1
}).from(".topic", {
    opacity: 0,
    y: "4rem",
    duration: 1
})