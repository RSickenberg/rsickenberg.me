import {useEffect, useState} from "preact/hooks";
import {gsap} from "gsap";

import projects from "../data/projects.json";

export interface IMediaSizes {
    height: number;
    width: number;
}

export interface IProject {
    id: number;
    name: string;
    roles: string[];
    url?: string | null;
    media: string;
    mediaSizes: IMediaSizes;
    deprecated?: boolean
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
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const imageYOffset = 150;

    // This function is called when the mouse moves.
    const handleMouseMove = (e: MouseEvent) => {
        // The mouse position is used to position the image.
        setMousePos({x: e.clientX, y: e.clientY});
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
                        <p>{`${(index + 1).toString().padStart(2, '0')} / ${projects.length.toString().padStart(2, '0')}`}</p>
                        <p class={`font-bold text-2xl ${project.deprecated ? 'line-through' : ''}`}>{project.name}</p>
                    </div>

                    <img
                        src={project.media}
                        alt={project.name}
                        class="block md:hidden my-4 w-full object-cover rounded-3xl border-2 border-gray-600 dark:border-gray-200 shadow-2xl"
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
                // @ts-ignore TS2322
                ref={(el: HTMLDivElement) => {
                    if (el && activeIndex >= 0) {
                        // @ts-ignore
                        const img: Nullable<HTMLImageElement> = document.getElementById(el.children.item(activeIndex).id);
                        if (!img) {
                            return
                        }

                        img.style.setProperty("--img-x", `${mousePos.x - img.width / 2}px`);
                        img.style.setProperty("--img-y", `${mousePos.y - imageYOffset}px`);
                    }
                }}
                className="relative hidden md:block top-0 left-0 w-auto h-auto z-10 aspect-auto"
            >
                {photos.map((photo: IPhotos, index: number) => {
                    const isActive = index === activeIndex;

                    return (
                        <img
                            // @ts-ignore TS2322
                            id={index}
                            alt="A project picture"
                            src={photo.media}
                            className={`fixed scale-50 pointer-events-none select-none rounded-3xl transition-transform border-2 border-gray-600 dark:border-gray-200 ${
                                isActive ? "opacity-100" : "opacity-0"
                            }`}
                            key={index}
                            width={photo.sizes.width}
                            height={photo.sizes.height}
                            loading="lazy"
                            style="top: var(--img-y); left: var(--img-x);"
                        />
                    );
                })}
            </div>
        </ul>
    );
}
