// let navbar = document.getElementById("menu");

// let stickPositon = navbar.offsetTop;

// function addOrRemoveSticky() {
//   if (window.pageYOffset >= stickPositon) {
//     navbar.classList.add("sticky");
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }

// window.onscroll = () => {
//   addOrRemoveSticky();
// };

// window.onresize = () => {
//   stickPositon = navbar.offsetTop;
// };
const scroller = document.querySelector(".container");

// Map each menu → its target section (from href="#id")
const menus = [...document.querySelectorAll(".menu")].map((el) => {
  const href = el.getAttribute("href") || "";
  const id = href.startsWith("#") ? href.slice(1) : null;
  return { el, id, section: id ? document.getElementById(id) : null };
});

// Optional rule: if you want "Dirk Hornschuch" to follow ABOUT instead of HOME,
// uncomment this:
// const home = menus.find(m => m.id === 'home');
// const about = menus.find(m => m.id === 'about');
// if (home && about) home.section = about.section;

function vwToPx(vw) {
  return (vw / 100) * window.innerWidth;
}

// Compute the scrollTop threshold when a menu should stop being fixed-bottom.
// Until that point: .is-fixed (fixed bottom). After crossing: sticky takes over.
function thresholdFor(menu) {
  const sec = menu.section;
  if (!sec) return -Infinity; // no section, never fix

  // section's top inside the scroller's coordinate system
  const secTop = sec.offsetTop; // works with your structure
  const vh = scroller.clientHeight;
  const mh = menu.el.offsetHeight;
  const gapB = vwToPx(0.8); // 0.8vw in px

  // Keep fixed-bottom until the "bottom line" (vh - (gap + mh)) reaches sectionTop:
  //   scrollTop + (vh - (gapB + mh)) = secTop
  // → scrollTop = secTop - (vh - (gapB + mh))
  return secTop - (vh - (gapB + mh));
}

let thresholds = new Map();

function recompute() {
  thresholds.clear();
  menus.forEach((m) => thresholds.set(m.el, thresholdFor(m)));
  onScroll(); // apply immediately
}

function onScroll() {
  const y = scroller.scrollTop;
  menus.forEach((m) => {
    const t = thresholds.get(m.el) ?? -Infinity;
    // BEFORE threshold → fixed at bottom (is-fixed = true)
    // AFTER threshold  → sticky (is-fixed = false)
    const shouldBeFixed = y < t;
    m.el.classList.toggle("is-fixed", shouldBeFixed);
  });
}

window.addEventListener("load", recompute);
window.addEventListener("resize", recompute);
scroller.addEventListener("scroll", onScroll, { passive: true });
