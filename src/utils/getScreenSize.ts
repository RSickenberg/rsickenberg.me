export default function getScreenSize() {
  let size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  document.addEventListener("resize", (e: Event) => {
    // console.log(e);
  });

  return size;
}