// DOKUMENT READY

// SCROLL EVENT (just scroll when threshold is passed)
// HERE IS A MORE DETAILES ANNOTATION NEEDED
// ?????




// OPTIONAL

document.addEventListener("DOMContentLoaded", () => {
  let currentSection = 0; // 0 = erster, 1 = zweiter
  let isScrolling = false;
  const threshold = 100; // Pixel Schwellwert
  const sections = document.querySelectorAll("section");

  window.addEventListener("wheel", (e) => {
    if (isScrolling) return; // Scrolls sperren, bis fertig
    const delta = e.deltaY;

    // Scroll nach unten
    if (delta > threshold && currentSection < sections.length - 1) {
      isScrolling = true;
      currentSection++;
      window.scrollTo({
        top: currentSection * window.innerHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrolling = false;
      }, 600);
    }

    // Scroll nach oben
    if (delta < -threshold && currentSection > 0) {
      isScrolling = true;
      currentSection--;
      window.scrollTo({
        top: currentSection * window.innerHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrolling = false;
      }, 600);
    }
  });
});

// CLICK FUNCTIONS
// click on thumbnail
//click on #name to get to start
//click on #en for english version
//click on #de for german version


// MOUSE FUNCTIONS
