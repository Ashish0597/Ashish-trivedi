// ===================================================================
// Ashish Trivedi — portfolio poster animations
// Uses GSAP + ScrollTrigger (loaded via CDN in index.html)
// ===================================================================

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  if (!prefersReducedMotion) {
    // ---------- Hero load-in: name, tagline, photo, education fade/slide in ----------
    const heroTimeline = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    heroTimeline
      .from(".name-line", { y: 40, opacity: 0, stagger: 0.12 })
      .from(".tagline", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(".portrait-img", { y: 60, opacity: 0, duration: 1.1 }, "-=0.8")
      .from(
        [".education-block", ".vertical-label"],
        { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 },
        "-=0.6"
      )
      .from(".doodle", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.5");

    // ---------- Scroll-triggered card reveals ----------
    gsap.utils.toArray(".reveal").forEach((el, i) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // ---------- Skills list: subtle stagger reveal ----------
    gsap.from(".skills-list li", {
      x: 16,
      opacity: 0,
      duration: 0.5,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-block",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // ---------- Gentle parallax on the portrait as the page scrolls ----------
  gsap.to(".portrait-img", {
  y: -15,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});
  }
}

// ===================================================================
// Interactive Kinetic Background Text Animation
// ===================================================================
if (!prefersReducedMotion) {
  
  // 1. Passive Continuous Floating Drift (Smooth Infinite Loop)
  gsap.to(".line-one", {
    x: 30,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".line-two", {
    x: -40,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // 2. Interactive Mouse-Move Depth Parallax
  window.addEventListener("mousemove", (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;

    // Moving elements organically at calculated speed vectors
    gsap.to(".line-one", {
      x: `+=${mouseX * 40}`,
      y: mouseY * 15,
      overwrite: "auto",
      duration: 1.5,
      ease: "power2.out"
    });

    gsap.to(".line-two", {
      x: `-=${mouseX * 50}`,
      y: mouseY * -20,
      overwrite: "auto",
      duration: 1.5,
      ease: "power2.out"
    });
  });

  // 3. Fluid Color Wave Sweep On Main Wrapper Scroll
  gsap.to(".interactive-word", {
    backgroundPosition: "-200% center",
    scrollTrigger: {
      trigger: ".hero-poster",
      start: "top top",
      end: "bottom center",
      scrub: 1.5
    }
  });
}