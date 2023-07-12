let darkThemeEnabled = false;
const timeline = gsap.timeline();
const timeline2 = gsap.timeline();
import { mobilecheck } from "./animatedbg.js";


const tippyOptions = (textContent) => {
    return {
        content: `<p class=\"tippy\">${textContent}</p>`,
        placement: 'right',
        animation: 'shift-away',
        animateFill: true,
        allowHTML: true,
        theme: "transparent"
    }
}

const addTippy = () => {
    const t1 = tippy('.logoutbtn', tippyOptions("logout"));
    tippy('.dark-mode-icon', tippyOptions("change theme to dark mode"));
    tippy('.light-mode-icon', tippyOptions("change theme to light mode"));
    tippy('.about', tippyOptions("about Karmyog"));

}

if (!mobilecheck())
    addTippy();

const documentEl = document.documentElement;
const ThemeChangeBtnEl = document.querySelector(".themechangeicon");




const themeChanger = async () => {

    if (!darkThemeEnabled) {
        darkThemeEnabled = true;
        ThemeChangeBtnEl.removeEventListener("click", themeChanger);
        window.localStorage.setItem("darkTheme", darkThemeEnabled);
        await timeline
            .to('.dark-mode-icon', {
                rotate: 360,
                scale: 0,
                duration: 0.5
            }).to('.light-mode-icon', {
                scale: 1,
                rotate: 360,
                duration: 0.5,
                // fill: "#000000"
            }).to('.light-mode-icon path, .svg path', {
                fill: "#F0F3F8",

                delay: -0.5,
            }).to('.about circle, .about path', {
                stroke: "#F0F3F8",
                delay: -0.5
            }).add(() => {
                documentEl.setAttribute('data-theme', 'dark');
            })
            .to('.darkbg', {
                scale: 1.2,
                delay: -0.5,
                duration: 1.2
            }).to('.navbar', {
                background: "#051839",
                duration: 0,
                delay: -0.5
            })
        ThemeChangeBtnEl.addEventListener("click", themeChanger);

    }
    // duration: 5

    else {
        darkThemeEnabled = false;
        ThemeChangeBtnEl.removeEventListener("click", themeChanger);
        window.localStorage.setItem("darkTheme", darkThemeEnabled);


        await timeline2.to('.navbar', {
            background: "#F0F3F8",
            duration: 0

        }).to('.light-mode-icon', {
            rotate: -360,
            scale: 0,
            duration: 0.5,
            // fill: "#000000"
        }).to('.light-mode-icon path, .svg path', {
            fill: "#051839",

            delay: -0.5,
        }).to('.about circle, .about path', {
            stroke: "#051839",
            delay: -0.5
        }).add(() => {
            documentEl.setAttribute('data-theme', 'light');
        }).to('.darkbg', {
            scale: 0,
            delay: -0.5,
            duration: 1
        }).to('.dark-mode-icon', {
            scale: 1,
            rotate: -360,
            duration: 0.5,
            // fill: "#000000"
        })
        ThemeChangeBtnEl.addEventListener("click", themeChanger);

    }
}

ThemeChangeBtnEl.addEventListener("click", themeChanger);

const initalThemeCheck = window.localStorage.getItem("darkTheme")

if (initalThemeCheck === "true") {
    darkThemeEnabled = true;
}



