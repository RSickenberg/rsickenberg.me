export default function getScreenSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

export const isMobile: boolean = (typeof localStorage !== 'undefined' && localStorage.mobile) ||
    (typeof window !== 'undefined' && window.navigator.userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i));
