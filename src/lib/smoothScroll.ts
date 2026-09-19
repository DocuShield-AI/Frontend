import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function scrollToSection(href: string, offset = -88) {
  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.15 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  window.history.pushState(null, "", href);
}
