"use client";

import { useEffect } from "react";

const REVEAL_THRESHOLD = 40;

export function NavReveal() {
  useEffect(() => {
    const update = () => {
      document.body.classList.toggle(
        "nav-visible",
        window.scrollY > REVEAL_THRESHOLD,
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      document.body.classList.remove("nav-visible");
    };
  }, []);

  return null;
}
