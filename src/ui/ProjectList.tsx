import { useCallback, useEffect, useState } from "preact/hooks";
import EmblaCarousel, { type EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

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

interface ProjectListProps {
    optimizedImages: Array<{ src: string; srcSet: { attribute: string }; attributes: { width: number; height: number } }>;
}

// @ts-ignore
export default function ProjectList({ optimizedImages }: ProjectListProps) {
    const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);
    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    const viewportRef = useCallback((node: HTMLDivElement | null) => {
        setViewportEl(node);
    }, []);

    // Embla drives a horizontal carousel on desktop; on mobile the cards
    // are left in normal document flow so the page just scrolls vertically.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const onChange = () => setIsDesktop(mediaQuery.matches);
        onChange();
        mediaQuery.addEventListener("change", onChange);
        return () => mediaQuery.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (!viewportEl || !isDesktop) {
            setEmblaApi(null);
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const plugins = prefersReducedMotion
            ? []
            : [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })];

        const api = EmblaCarousel(viewportEl, { loop: true, align: "start" }, plugins);
        setEmblaApi(api);
        return () => api.destroy();
    }, [viewportEl, isDesktop]);

    useEffect(() => {
        if (!emblaApi) {
            setSelectedIndex(0);
            return;
        }

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();
    const scrollTo = (index: number) => emblaApi?.scrollTo(index);

    return (
        <div id="projects-list" class="w-[90%] mx-auto pb-16 md:pb-0">
            <div class="overflow-visible md:overflow-hidden" ref={viewportRef}>
                <ul class="flex flex-col md:flex-row gap-8 md:gap-0 touch-pan-y" role="list">
                    {projects.map((project: IProject, index: number) => {
                        const isExternal = !!project.url && /^https?:\/\//.test(project.url);
                        const Wrapper = project.url ? "a" : "div";
                        const wrapperProps = project.url
                            ? { href: project.url, ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
                            : {};

                        return (
                            <li key={project.id} class="shrink-0 grow-0 basis-full md:basis-[98%] md:pr-6">
                                <Wrapper
                                    {...wrapperProps}
                                    // @ts-ignore
                                    style={{ "--accent-light": project.accent.light, "--accent-black": project.accent.black }}
                                    class="flex flex-col md:flex-row items-stretch gap-8 md:gap-6 rounded-3xl p-8 md:p-20 h-[560px] md:h-[580px] overflow-hidden bg-[var(--accent-light)] dark:bg-[var(--accent-black)]"
                                >
                                    <div class="flex flex-col items-center text-center md:items-start md:text-left justify-center shrink-0 md:w-1/2">
                                        <p class="font-light font-sans text-lg text-gray-600 dark:text-gray-400">{`${(index + 1).toString().padStart(2, "0")} / ${projects.length.toString().padStart(2, "0")}`}</p>
                                        <p class="font-semibold text-3xl md:text-4xl mt-2 text-black dark:text-white">{project.name}</p>
                                        <p class="font-light font-sans text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            {project.year}{project.eol ? ` - ${project.eol}` : ""}
                                        </p>
                                        <div class="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1 mt-4 text-black dark:text-white">
                                            {project.roles.map((role: string, roleIndex: number) => (
                                                <p key={roleIndex}>{role}{roleIndex < project.roles.length - 1 ? "," : ""}</p>
                                            ))}
                                        </div>
                                    </div>

                                    <img
                                        src={optimizedImages[index].src}
                                        alt={project.name}
                                        class={`w-full md:w-1/2 h-full flex-1 md:flex-none object-cover rounded-3xl border-2 border-gray-600 dark:border-gray-200 shadow-2xl dark:shadow-lg project-image-float ${project.accent.shadow_class}`}
                                        // @ts-ignore
                                        style={{ "--float-rotate": "1.5deg", animationDelay: `${index * 0.4}s` }}
                                        decoding="auto"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        srcset={optimizedImages[index].srcSet.attribute}
                                        width={optimizedImages[index].attributes.width}
                                        height={optimizedImages[index].attributes.height}
                                    />
                                </Wrapper>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div class="hidden md:flex items-center justify-center gap-6 mt-8">
                <button
                    type="button"
                    aria-label="Previous project"
                    onClick={scrollPrev}
                    class="p-2 rounded-full border border-gray-400 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5" fill="currentColor" aria-hidden="true">
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
                    </svg>
                </button>

                <div class="flex items-center gap-2">
                    {projects.map((project: IProject, index: number) => (
                        <button
                            key={project.id}
                            type="button"
                            aria-label={`Go to ${project.name}`}
                            aria-current={index === selectedIndex}
                            onClick={() => scrollTo(index)}
                            class={`h-2 rounded-full transition-all cursor-pointer ${
                                index === selectedIndex
                                    ? "w-6 bg-black dark:bg-white"
                                    : "w-2 bg-gray-400 dark:bg-gray-600"
                            }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    aria-label="Next project"
                    onClick={scrollNext}
                    class="p-2 rounded-full border border-gray-400 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5" fill="currentColor" aria-hidden="true">
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
