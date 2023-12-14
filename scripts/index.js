document.querySelectorAll("a[href^='#']").forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    const offset = 120; // Adjust this value to your desired offset

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
  const underline = document.getElementById("underline");
  const sections = document.querySelectorAll("section");

  let clickedAtag = false;

  function highlightMenu() {
    let currentSectionId = "";
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 400 && rect.bottom >= 50) {
        currentSectionId = section.id;
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
        if (!clickedAtag) {
          const rect = link.getBoundingClientRect();
          const underlinePosition = rect.left + (rect.width / 2) - (underline.offsetWidth / 2);
          underline.style.transform = `translateX(${underlinePosition}px)`;
        }
      }
    });
  }

  window.addEventListener("scroll", highlightMenu);
  highlightMenu(); // Call it once on page load
});



// document.addEventListener('DOMContentLoaded', function () {
//       // Get all elements with the class 'grid-item'
//       const gridContainer = document.getElementById("spContainer")
//       const gridItems = gridContainer.querySelectorAll('div');

//       // Function to toggle visibility based on data type
//       function toggleVisibility(dataType) {
//         gridItems.forEach(item => {
//           if (item.dataset.type === dataType) {
//             item.classList.toggle('spHidden');
//           }
//         });
//       }

//       // Add click event listeners to the buttons
//       document.getElementById('buttonS').addEventListener('click', function () {
//         toggleVisibility('s');
//       });

//       document.getElementById('buttonH').addEventListener('click', function () {
//         toggleVisibility('h');
//       });
//     });

var swiper = null; // Initialize swiper variable

function initializeSwiper() {
  swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 10,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      forceToAxis: true,
      thresholdDelta: 70,
      eventsTarget: ".swiper",
      passiveListeners: true
    },
    spaceBetween: 60,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });
}

function destroySwiper() {
  if (swiper !== null) {
    swiper.destroy(true, true);
    swiper = null;
  }
}

// Check window width initially and on resize
function checkWindowWidth() {
  if (window.innerWidth < 951) {
    // If the window width is under 941, initialize Swiper
    initializeSwiper();
  } else {
    // If the window width is not under 941, destroy Swiper if it exists
    destroySwiper();
  }
}

// Initial check
checkWindowWidth();

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

// Use debounce for the resize event
window.addEventListener("resize", debounce(function () {
  checkWindowWidth();

  // Ensure that Swiper is updated after resize
  if (swiper !== null) {
    swiper.update();
  }
}, 200));

