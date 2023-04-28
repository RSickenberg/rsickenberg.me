import { useEffect, useState } from "preact/hooks";
import { gsap } from "gsap";

import projects from "../data/projects.json";

export interface IMediaSizes {
  height: number;
  width: number;
}

export interface IProject {
  id: number;
  name: string;
  roles: string[];
  url: string;
  media: string;
  mediaSizes: IMediaSizes;
}

interface IPhotos {
  media: string,
  sizes: IMediaSizes,
}

const photos: IPhotos[] = projects.map((p) => {
  return {media: p.media, sizes: p.mediaSizes};
});

export default function ProjectList() {
  // This state variable keeps track of which item in the dropdown is currently active.
  // This is used to show that item is currently active.
  // The default value is -1 because the first item in the array is at index 0.
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const _offsetY = 500;

  // This function is called when the mouse moves.
  const handleMouseMove = (e: MouseEvent) => {
    // The mouse position is used to position the image.
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // This code adds an event listener to the window that listens for mouse moves.
  // It also returns a function that removes the event listener after the component
  // unmounts.
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    // When the mouse enters an item, the index of that item is set as the active index.
    setActiveIndex(index);
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const matchedColor = isDarkMode
      ? projects[index]?.accent.black
      : projects[index]?.accent.light;
    const returnValue = isDarkMode
      ? "rgba(0, 0, 0, 0)"
      : "rgba(255, 255, 255, 0)";
    gsap.to(".layer", {
      duration: 0.5,
      backgroundColor: matchedColor || returnValue,
      ease: "Cubic.easeOut",
    });
  };

  return (
    <ul class={"w-[90%] mx-auto py-10"} role="list">
      {projects.map((project: IProject, index: number) => (
        <a
          href={project.url}
          target="_blank"
          key={project.id}
          class="flex flex-col md:flex-row justify-between items-center dark:text-white text-black py-16"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseEnter(-1)}
          rel="noreferrer"
        >
          <div class="flex flex-col md:flex-row items-center md:space-x-8">
            <p>{`0${index + 1} / 0${projects.length}`}</p>
            <p class="font-bold text-2xl">{project.name}</p>
          </div>

          <img
            src={project.media}
            alt={project.name}
            class="block md:hidden my-4 w-full object-cover rounded-2xl"
          />

          <div class="flex items-center space-x-2 md:space-x-4">
            {project.roles.map((role: string, index: number) => (
              <p key={index}>{role}.</p>
            ))}
          </div>
        </a>
      ))}

      {/* Floating images on hover */}
      <div
        ref={(el: HTMLDivElement) => {
          if (el && activeIndex >= 0) {
            const offsetY = -1000;
            const offsetX = -50;
            const aRect = el.getBoundingClientRect();
            const aTop = aRect.top + window.scrollY;
            const diffY = Math.abs(mousePos.y - aTop);
            const y = aTop + ((mousePos.y > aTop) ? (diffY + offsetY) : (-diffY - offsetY));
            const x = mousePos.x + offsetX;

            gsap.to(el, {
              duration: 0.2,
              x: x,
              y: y,
              ease: "power3.out"
            });
          }
        }}
        className="relative hidden md:block top-0 left-0 w-auto h-auto z-10"
      >
        {photos.map((photo: IPhotos, index: number) => {
          const isActive = index === activeIndex;

          return (
            <img
              alt="A project picture"
              src={photo.media}
              className={`absolute scale-50 transform-gpu pointer-events-none select-none rounded-xl transition-[opacity,transform] ${
                isActive ? "opacity-100" : "opacity-10"
              } right-1/2`}
              key={index}
              width={photo.sizes.width}
              height={photo.sizes.height}
              loading="lazy"
            />
          );
        })}
      </div>
    </ul>
  );
}
