import {type MutableRef, useEffect, useRef} from "preact/hooks";
import throttle from "lodash.throttle";
import {gsap} from "gsap";

import projects from "../data/projects.json";

export interface IMediaSizes {
    height: number;
    width: number;
}

export interface IAccent {
    black: string,
    light: string,
    shadow_class: string
}

export interface IProject {
    id: number;
    name: string;
    roles: string[];
    url?: string | null;
    media: string;
    accent: IAccent;
    mediaSizes: IMediaSizes;
    deprecated?: boolean;
    year: number;
    eol?: number;
}

interface IPhotos {
    media: string,
    sizes: IMediaSizes,
}

const photos: IPhotos[] = projects.map((p) => {
    return {media: p.media, sizes: p.mediaSizes};
});

// @ts-ignore
export default function ProjectList({optimizedImages}: Array<object>) {
    // This state variable keeps track of which item in the dropdown is currently active.
    // This is used to show that item is currently active.
    // The default value is -1 because the first item in the array is at index 0.
    const activeIndex = useRef<number>(-1);
    const mousePos = useRef({ x: 0, y: 0 });
    const imageYOffset = 140;
    let imageHandle: MutableRef<HTMLImageElement | null> = useRef(null);

    // This code adds an event listener to the window that listens for mouse moves.
    // It also returns a function that removes the event listener after the component
    // unmounts.
    useEffect(() => {
        const updatePosition = () => {
            if (imageHandle.current === null || activeIndex.current === -1) {
                return;
            }
            imageHandle.current.style.setProperty("--img-x", `${mousePos.current.x - imageHandle.current.width / 2}px`);
            imageHandle.current.style.setProperty("--img-y", `${mousePos.current.y - imageYOffset}px`);
        };

        // This function is called when the mouse moves.
        const handleMouseMove = throttle((e: MouseEvent) => {
            // The mouse position is used to position the image.
            mousePos.current = {x: e.clientX, y: e.clientY};
            requestAnimationFrame(updatePosition)
        }, 15);

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleMouseEnter = (index: number) => {
        // When the mouse enters an item, the index of that item is set as the active index.
        activeIndex.current = index;
        // @ts-ignore
        this.forceUpdate();

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
            ease: "power2.inOut",
        });
    };

    return (
        <ul id={"projects-list"} class={"w-[90%] mx-auto pb-10 md:pb-0"} role="list">
            {projects.map((project: IProject, index: number) => (
                <li
                    key={project.id}
                    class="flex flex-col md:flex-row justify-between items-center dark:text-white text-black pt-0 pb-32"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseEnter(-1)}
                >
                    <div class="flex flex-col md:flex-row items-center justify-center md:items-baseline md:space-x-8">
                        <p class={'font-light md:font-thin font-sans text-xl text-gray-600'}>{`${(index + 1).toString().padStart(2, '0')} / ${projects.length.toString().padStart(2, '0')}`}</p>
                        <p class={'font-semibold text-3xl'}>{project.name}</p>
                        <p class={'font-light md:font-thin font-sans text-sm text-gray-600 mt-2 sm:mt-0'}>{project.year} {project.eol ? ' - ' + project.eol : ''}</p>
                    </div>

                    <img
                        src={optimizedImages[index].src}
                        alt={project.name}
                        class="block md:hidden my-4 w-full object-cover rounded-3xl border-2 border-gray-600 dark:border-gray-200 shadow-2xl"
                        decoding={'async'}
                        loading={'eager'}
                        srcset={optimizedImages[index].srcSet.attribute}
                        width={optimizedImages[index].attributes.width}
                        height={optimizedImages[index].attributes.height}
                    />

                    <div class="flex items-center space-x-2 md:space-x-4">
                        {project.roles.map((role: string, index: number) => (
                            <p key={index}>{role}.</p>
                        ))}
                    </div>
                </li>
            ))}

            {/* Floating images on hover */}
            <div
                // @ts-ignore TS2322
                ref={(el: HTMLDivElement) => {
                    if (el) {
                        // @ts-ignore
                        imageHandle.current = document.getElementById(el.children.item(activeIndex.current)?.id);
                    }
                }}
                className="relative top-0 left-0 z-10 hidden w-auto h-auto md:block aspect-auto"
            >
                {photos.map((photo: IPhotos, index: number) => {
                    const isActive = index === activeIndex.current;

                    return (
                            <img
                                // @ts-ignore TS2322
                                id={index}
                                alt="A project picture"
                                src={photo.media}
                                className={`fixed scale-50 pointer-events-none select-none rounded-3xl transition-[shadow,transform] border-2 border-gray-600 dark:border-gray-200 shadow-2xl ${
                                    isActive ? "opacity-100" : "opacity-0"
                                } ${projects[index].accent.shadow_class}`}
                                key={index}
                                width={optimizedImages[index].attributes.width}
                                height={optimizedImages[index].attributes.height}
                                decoding={'async'}
                                loading={'eager'}
                                srcset={optimizedImages[index].srcSet.attribute}
                                style="top: var(--img-y); left: var(--img-x);"
                            />
                    );
                })}
            </div>
        </ul>
    );
}
