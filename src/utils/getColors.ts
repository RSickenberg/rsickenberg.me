const alphaValues = { dark: 0.9, light: 0.8 };
const colors = { light: "white", dark: "black" };
const minValuableWidht = 1240;

let isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    isDarkMode = e.matches;
  });

let isMinimalWidth = window.innerWidth >= minValuableWidht;

export { colors, alphaValues, isDarkMode, isMinimalWidth };
