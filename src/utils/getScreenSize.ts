export default function getScreenSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

export const isMobile: boolean = (typeof localStorage !== 'undefined' && localStorage.mobile) || (typeof window !== 'undefined' && window.navigator.maxTouchPoints > 1);
