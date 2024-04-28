async function getSpeisen() {
  try {
    // console.warn("version uses direct links")
    // let response = await fetch('https://rudipsq.github.io/restaurant-1/data/speisen.json');
    let response = await fetch("/data/speisen.json");
    let jsonData = await response.json();
    const fl = jsonData.flammkuchen;

    return fl;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
    // return null
  }
}

// - - Mobile Nav

// close if links clicked
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#hDark nav a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      toggleMobileMenu();
    });
  });
});

// close if opened overlay clicked
let overlay = document.getElementById("hDark");
overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    toggleMobileMenu();
  }
});

// show/hide link overlay
function toggleMobileMenu() {
  if (window.innerWidth > 760) return;

  const mobileMenu = document.getElementById("hDark");
  if (mobileMenu.style.visibility != "visible") {
    // mobileMenu.style.display = "none";
    mobileMenu.style.visibility = "visible";
    mobileMenu.style.opacity = "1";
  } else {
    // mobileMenu.style.display = "flex";
    mobileMenu.style.visibility = "hidden";
    mobileMenu.style.opacity = "0";
  }
}
