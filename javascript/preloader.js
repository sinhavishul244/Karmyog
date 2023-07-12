export function OpenPreloader() {
    const preloader = document.querySelector(".preloader");
    preloader.style.display = "flex";
}

const svg = document.querySelector(".preloader svg");


export function ClosePreloader() {

    const preloader = document.querySelector(".preloader");
    // console.log(preloader)
    preloader.style.opacity = 0;
    const svg = document.querySelector(".preloader img");
    svg.setAttribute("class", "expanded");
    setTimeout(() => {
        preloader.style.display = "none";
        svg.style.visibility = "hidden";
    }, 800)
    // preloader.style.display = "none";
}


