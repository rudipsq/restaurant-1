let speisen;

document.addEventListener("DOMContentLoaded", async function () {
  // adding speisen
  speisen = await getSpeisen();
  addSpeisen();
  //addGetraenke()

  setUpContainer();
  window.addEventListener("resize", setUpContainer);

  // opening overlays
  let spGrid = document.getElementById("spGrid");
  spGrid.addEventListener("click", function (event) {
    let product = event.target.closest("#spGrid>div");

    if (product && product.getAttribute("data-id")) {
      showSpeise(product.getAttribute("data-id"));
    }
  });

  // overlay closing event
  let overlay = document.getElementById("overlay");
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  // open current speise (from url)
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");

  if (urlId) {
    showSpeise(urlId);
  }

  // remove unclean stuff from url
  history.replaceState({}, document.title, window.location.pathname);
});

//* GRID DISPLAY
function setUpContainer() {
  let mainContainer = document.getElementById("mainContainer");
  let main = document.querySelector("main");

  main.classList.add("mFix");
  // mainContainer.classList.add("hFix")
  if (!(mainContainer.clientHeight + 159 > window.innerHeight)) {
    mainContainer.classList.add("hFix");
    main.classList.remove("mFix");
  }
}

//* SPEISEN
function addSpeisen() {
  const flammkuchen = speisen;

  flammkuchen.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("data-id", product.id);
    productDiv.innerHTML = `
      <div class="spText">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div>
        <img src="img/pic/flammkuchen/brett.webp">
        <img src="img/pic/flammkuchen/${product.id}.webp">
      </div>
      <div class="cardBackgroundGradientNoHover"></div>
    `;

    // if (product.type) {
    // } else {
    // }

    document
      .getElementById("spGrid")
      .insertBefore(productDiv, document.getElementById("moreSpeisen"));
  });
}

function showSpeise(speiseId) {
  let speise;

  for (let i = 0; i < speisen.length; i++) {
    if (speisen[i].id === speiseId) {
      speise = speisen[i];
      break;
    }
  }

  openOverlay(speiseId, speise.name, speise.description);
}

function openOverlay(id, name, description) {
  document.getElementById("ocImg").src = "img/pic/flammkuchen/" + id + ".webp";
  document.getElementById("ocHead").innerHTML = "Flammkuchen „" + name + "“";
  document.getElementById("ocDesc").innerHTML = "mit " + description;

  document.getElementById("overlay").classList.add("active");

  changeMobileButtonIcon("img/icon/cross.png");
}

function closeOverlay() {
  document.getElementById("overlay").classList.remove("active");

  changeMobileButtonIcon("img/icon/menu.png");
}

// overide toggleMobileMenu() function ?
function toggleMobileMenu() {
  if (window.innerWidth > 760) return;

  if (document.getElementById("overlay").classList.contains("active")) {
    closeOverlay();
  } else {
    const mobileMenu = document.getElementById("hDark");
    if (mobileMenu.style.visibility != "visible") {
      mobileMenu.style.visibility = "visible";
      mobileMenu.style.opacity = "1";
    } else {
      mobileMenu.style.visibility = "hidden";
      mobileMenu.style.opacity = "0";
    }
  }
}

// change mobile menu icon
function changeMobileButtonIcon(url) {
  if (window.innerWidth > 760) return;
  document.getElementById("mobileMenu").style.backgroundImage = `url('${url}')`;
}
