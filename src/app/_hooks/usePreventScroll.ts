import { useEffect } from 'react';

export function usePreventScroll() {
  useEffect(() => {
    const currentScrollY = window.scrollY;

    document.body.style.cssText += `
      position: fixed;
      width: 100%;
      top: -${currentScrollY}px;
      overflow: hidden;
    `;

    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';

      window.scrollTo(0, currentScrollY);
    };
  }, []);
}
