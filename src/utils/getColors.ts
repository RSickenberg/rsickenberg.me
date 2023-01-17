const alphaValues = { dark: 0.9, light: 0.8 };
const colors = { light: "white", dark: "black" };
const minValuableWidht = 1265;

let isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    isDarkMode = e.matches;
  });

let isMinimalWidth = window.innerWidth >= minValuableWidht;
let isMd = window.innerWidth <= minValuableWidht && window.innerWidth >= 768;
let isSm = window.innerWidth < 1025;

export { colors, alphaValues, isDarkMode, isMinimalWidth, isMd, isSm };
