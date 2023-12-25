var swiper = null;
var spHswiper = null;
var spSswiper = null;

document.addEventListener("DOMContentLoaded", async function () {
  checkWindowWidth();
  initializeSpSwiper();
  addSpeisen();

  
  document.querySelector('header').classList.add('header-fade');
});

// make header visible
document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    var scrollDistance = window.scrollY;

    var threshold = window.innerHeight - 180;

    if (scrollDistance > threshold) {
      header.style.opacity = '1';
    } else {
      header.style.opacity = '0';
    }
  }, { passive: true });
});

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
      // link.classList.remove("active"); //? not used right now
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        // link.classList.add("active"); //? not used right now
        if (!clickedAtag) {
          const rect = link.getBoundingClientRect();
          const underlinePosition = rect.left + (rect.width / 2) - (underline.offsetWidth / 2);
          underline.style.transform = `translateX(${underlinePosition}px)`;
        }
      }
    });
  }

  window.addEventListener("scroll", highlightMenu);
  window.addEventListener("resize", highlightMenu);
  highlightMenu(); // Call it once on page load
});

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




const container = document.getElementById('ssCorner');
const background = document.getElementById('ssBackground');
const foreground = document.getElementById('ssForeground');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

  parallax(background, xAxis, yAxis, 0.2);
  parallax(foreground, xAxis, yAxis, 0.5);
});

function parallax(element, xAxis, yAxis, speed) {
  element.style.transform = `translate(${-xAxis * speed}px, ${-yAxis * speed}px) scale(1)`;
}





async function addSpeisen() {
  try {
    const response = await fetch('/data/speisen.json');
    const jsonData = await response.json();
    const products = jsonData.products;

    console.log(products);

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('swiper-slide');
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      `;

      if (product.type) {
        document.getElementById('spSswiper').getElementsByClassName('swiper-wrapper')[0].appendChild(productDiv);
      } else {
        document.getElementById('spHswiper').getElementsByClassName('swiper-wrapper')[0].appendChild(productDiv);
      }
    });

    // Instead of initializing immediately, use the update method
    spHswiper.update();
    spSswiper.update();
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
  }
}

function initializeSpSwiper(){
spHswiper = new Swiper("#spHswiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 10,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      forceToAxis: true,
      thresholdDelta: 70,
      eventsTarget: "#spHswiper",
      passiveListeners: true
    },
    spaceBetween: -100,
    loop: true
  });


  spSswiper = new Swiper("#spSswiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 10,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      forceToAxis: true,
      thresholdDelta: 70,
      eventsTarget: "#spSswiper",
      passiveListeners: true
    },
    spaceBetween: -100,
    loop: true
  });
}