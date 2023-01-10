const alphaValues = { dark: 0.9, light: 0.7 };
const colors = { light: "white", dark: "black" };

let isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    isDarkMode = e.matches;
  });

export { colors, alphaValues, isDarkMode };
