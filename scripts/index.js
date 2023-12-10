document.querySelectorAll("a[href^='#']").forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    const offset = 100; // Adjust this value to your desired offset

    if (targetElement) {
      const targetOffsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: targetOffsetTop - offset,
        behavior: "smooth"
      });
    }
  });
});

window.addEventListener("scroll", function() {
  // Check if the user has scrolled, and if so, hide the start screen
  if (window.scrollY > 0) {
    removeStartScreen()

    // Enable scrolling for the body content when the start screen is removed
    document.body.style.overflow = "auto";
  }
});

function removeStartScreen() {
    let startScreen = document.getElementById("startScreen")
    startScreen.style.opacity = 0;
    startScreen.style.pointerEvents = "none";
}


document.addEventListener("DOMContentLoaded", function() {
  const menuLinks = document.querySelectorAll("header nav a");
  const sections = document.querySelectorAll("section");

  function highlightMenu() {
    let currentSectionId = "";
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 400 && rect.bottom >= 50) {
        currentSectionId = section.id;
      }
    });

    // TODO: when anchor clicked, move underline directly to it

    menuLinks.forEach(link => {
      link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
        const rect = link.getBoundingClientRect();
        const underlinePosition = rect.left + (rect.width / 2) - (underline.offsetWidth / 2);
        underline.style.transform = `translateX(${underlinePosition}px)`;
        }
      });
    }

  window.addEventListener("scroll", highlightMenu);
  highlightMenu(); // Call it once on page load
});
