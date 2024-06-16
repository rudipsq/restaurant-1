window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const linkParam = urlParams.get("link");

  if (!linkParam) {
    // Remove the hash from the URL if the 'link' parameter is not present
    history.replaceState(null, null, window.location.pathname);
  } else {
    // Remove the 'link' parameter from the URL
    urlParams.delete("link");
    const newUrl = `${window.location.pathname}${
      window.location.hash ? window.location.hash : ""
    }`;
    history.replaceState(null, null, newUrl);
  }
};

async function getSpeisen() {
  try {
    // console.warn("version uses direct links")
    // let response = await fetch('https://rudipsq.github.io/restaurant-1/data/speisen.json');
    let response = await fetch("data/speisen.json");
    let jsonData = await response.json();
    const fl = jsonData.flammkuchen;

    return fl;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // device useragent
  if (navigator.userAgent) {
    var md = new MobileDetect(window.navigator.userAgent);

    // console.warn(md);

    // Check if the device is a tablet
    var isTablet = md.tablet() !== null;
    // Check if the device is a mobile
    var isMobile = md.mobile() !== null && !isTablet;

    if (isTablet) {
      document.body.classList.add("tablet");
    } else if (isMobile) {
      document.body.classList.add("mobile");
    } else {
      // Additional check for iPad in desktop mode
      if (
        navigator.userAgent.includes("Macintosh") &&
        "ontouchend" in document
      ) {
        document.body.classList.add("tablet");
      } else {
        document.body.classList.add("desktop");
      }
    }
  }

  // mobile menu
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

// show/hide mobile menu link overlay
function toggleMobileMenu() {
  if (window.innerWidth > 760) return;

  const mobileMenu = document.getElementById("hDark");
  if (mobileMenu.style.visibility != "visible") {
    mobileMenu.style.visibility = "visible";
    mobileMenu.style.opacity = "1";
  } else {
    mobileMenu.style.visibility = "hidden";
    mobileMenu.style.opacity = "0";
  }
}

window.addEventListener(
  "resize",
  debounce(function () {
    const headerDark = document.getElementById("hDark");

    if (window.innerWidth > 760) {
      headerDark.style.visibility = "visible";
      headerDark.style.opacity = "1";
    }
  }, 200)
);

// debounce function
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
