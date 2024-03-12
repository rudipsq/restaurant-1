var swiper = null;
var spHswiper = null;
var spSswiper = null;
var willkommenParallaxElements;
let speisen;

document.addEventListener("DOMContentLoaded", async function () {
  checkWindowWidth();
  speisen = await getSpeisen();
  addSpeisen();

  // header
  document.getElementById('underline').style.opacity = '1'

  // start screen
  parallax(background, (window.innerWidth / 2)/ 25, (window.innerHeight / 2)/ 25, 0.35);
  parallax(foreground, (window.innerWidth / 2)/ 25, (window.innerHeight / 2)/ 25, 0.5);

  document.getElementById('animationPlayer').style.opacity = '1';
  document.getElementById('animationPlayer').style.transform = 'scale(1)';

  // willkommen section
  willkommenParallaxElements = document.querySelectorAll(".wiGridImg");
  updateWillkommenParallax();


  // scroll eventListener
  window.addEventListener('scroll', function () {
    showHideHeader()
    updateWillkommenParallax();
  }, { passive: true });
  

  setTimeout(function() {
    // document.getElementById('startOverlay').style.opacity = '0';
    showHideHeader()
  }, 300);
  setTimeout(function() {
    document.getElementById('startOverlay').style.opacity = '0';
    // showHideHeader()
  }, 600);
});

window.addEventListener('load', function() {
    // Hide the loader
    // var loader = document.getElementById('loader');
    // loader.style.display = 'none';

    // Show the content
    var elements = document.querySelectorAll(".mainPage");
    console.log(elements)
    elements.forEach(function(element) {
      console.log(element);
      // element.style.display = 'block';
    });
});




//* HEADER
function showHideHeader() {
    var header = document.querySelector('header');

    var scrollDistance = window.scrollY;

    var threshold = window.innerHeight - 25;

    if (scrollDistance > threshold) {
      header.style.top = "0";
    } else {
      header.style.top = "-100px";
    }
}

// underline
document.addEventListener("DOMContentLoaded", function() {
  const menuLinks = document.querySelectorAll("header nav a");
  const underline = document.getElementById("underline");
  const sections = document.querySelectorAll("section");

  function highlightMenu() {
    let currentSectionId = "";

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 400 && rect.bottom >= 50) {
        currentSectionId = section.id;
      }
    });

    if (currentSectionId !== "") {
      menuLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          const rect = link.getBoundingClientRect();
          const underlinePosition = rect.left + (rect.width / 2) - (underline.offsetWidth / 2);
          underline.style.transform = `translateX(${underlinePosition}px)`;
        }
      });
    } else {
      // If no section is active, set underline to the #willkommen section
      const willkommenLink = document.querySelector("header nav a[href='#willkommen']");
      const willkommenRect = willkommenLink.getBoundingClientRect();
      const underlinePosition = willkommenRect.left + (willkommenRect.width / 2) - (underline.offsetWidth / 2);
      underline.style.transform = `translateX(${underlinePosition}px)`;
    }
  }

  window.addEventListener("scroll", highlightMenu);
  window.addEventListener("resize", highlightMenu);
  highlightMenu(); // Call it once on page load
});


//* SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    //console.log(entry);
    if(entry.isIntersecting){
      entry.target.classList.add('scShow');

      if(entry.target.id == "spImageTrigger"){
        speisenAnimation()
      }
    }
  })
})

const hiddenRightElements = document.querySelectorAll('.scHiddenRight');
hiddenRightElements.forEach((el)=> observer.observe(el));

const hiddenBottomElements = document.querySelectorAll('.scHiddenBottom');
hiddenBottomElements.forEach((el)=> observer.observe(el));

observer.observe(document.querySelector("#spImageTrigger"));

function speisenAnimation() {
  const elements = document.querySelectorAll("#spImageLayer img")

  elements.forEach(element => {
    const deferTime = parseInt(element.getAttribute('data-defer'));

    setTimeout(() => {
        element.classList.remove('hideSpImage');
    }, deferTime);
  });
}




//* START SCREEN
const background = document.getElementById('ssBackground');
const foreground = document.getElementById('ssForeground');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
  const yAxis = (window.innerHeight / 2 - e.clientY) / 25;

  parallax(background, xAxis, yAxis, 0.35);
  parallax(foreground, xAxis, yAxis, 0.5);
});

function parallax(element, xAxis, yAxis, speed) {
  element.style.transform = `translate(${-xAxis * speed}px, ${-yAxis * speed}px)`;
}



//* WILLKOMMEN
function updateWillkommenParallax() {
  willkommenParallaxElements.forEach(function (element) {
    var speed = parseFloat(element.getAttribute("data-speed")) || 1;
    var yOffset = window.pageYOffset * speed;
    element.style.transform = "translate3d(0, " + yOffset + "px, 0)";
  });
}



//* SPEISEN
async function addSpeisen() {
  const flammkuchen = speisen;

  flammkuchen.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('swiper-slide');
    productDiv.innerHTML = `
      
        <a class="spSwiperImgContainer" href="speisen.html?id=${product.id}">
        <img class="spSwiperImg1" src="img/pic/flammkuchen/brett.png">
        <img class="spSwiperImg2" src="img/pic/flammkuchen/${product.id}.png"></a>
     
        <h3><a href="speisen.html?id=${product.id}">${product.name}</a></h3>
      <p>${product.description}</p>
    `;
      
    //<img src="img/pic/fl_${product.id}.jpg">
    //<img src="img/pic/start_fl.png"></img>

    if (product.type) {
      document.getElementById('spSswiper').getElementsByClassName('swiper-wrapper')[0].appendChild(productDiv);
      // typeTrueCount++;
      // const container = document.getElementById('spSswiper').getElementsByClassName('swiper-wrapper')[0];
      // container.appendChild(productDiv.cloneNode(true));
      // container.appendChild(productDiv.cloneNode(true));
    } else {
      document.getElementById('spHswiper').getElementsByClassName('swiper-wrapper')[0].appendChild(productDiv);
    }
  });

  fixPosition()
  initializeSpSwiper()
}

function fixPosition() {
  var container = document.getElementById('spSswiper').getElementsByClassName('swiper-wrapper')[0];

  // Get the first three elements inside the container
  var firstThree = [];
  for (var i = 0; i < 6; i++) {
    firstThree.push(container.children[i]);
    i += 1;
  }

  // Move the first three elements to the end of the container
  firstThree.forEach(function(element) {
    console.log(element)
    container.appendChild(element);
  });
}

function initializeSpSwiper(){
  spHswiper = new Swiper("#spHswiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1,
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
    navigation: {
      nextEl: '#spHnext',
      prevEl: '#spHprev',
    },
    loop: true
  });


  spSswiper = new Swiper("#spSswiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1,
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
    navigation: {
      nextEl: '#spSnext',
      prevEl: '#spSprev',
    },
    loop: true
  });
}



//* STANDORTE
function openMaps(locationName) {
  // Check if the user is on an Apple device
  const isAppleDevice = /(iPhone|iPad|iPod|Macintosh)/.test(navigator.userAgent);

  // Create the maps URL with the coordinates
  const encodedLocationName = encodeURIComponent(locationName);
  const url = isAppleDevice
    ? `http://maps.apple.com/?q=${encodedLocationName}`
    : `https://www.google.com/maps/search/?api=1&query=${encodedLocationName}`;

  

  // Open the maps URL
  window.open(url, '_blank');
}

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




//<button onclick="callNumber('+123456789')">Call Us</button>
function callNumber(number) {
  window.location.href = 'tel:' + number;
}