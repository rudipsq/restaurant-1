let speisen;

document.addEventListener("DOMContentLoaded", async function () {
    // adding speisen
    speisen = await getSpeisen();
    addSpeisen();
    addGetraenke()

    setUpContainer()
    window.addEventListener('resize', setUpContainer);

    // opening overlays
    let spGrid = document.getElementById('spGrid');
    spGrid.addEventListener('click', function(event) {
      let product = event.target.closest('#spGrid>div')
    
      if (product) {
        showSpeise(product.getAttribute('data-id'))
      }
    });

    let gtGrid = document.getElementById('gtGrid');
    gtGrid.addEventListener('click', function(event) {
      let product = event.target.closest('#gtGrid>div')
    
      if (product) {
        showSpeise(product.getAttribute('data-id'))
      }
    });

    // overlay closing event
    let overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
          closeOverlay()
        }
    });

    // open current speise (from url)
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get('id');

    if(urlId) {
      showSpeise(urlId)
    }

    // remove unclean stuff from url
    history.replaceState({}, document.title, window.location.pathname);
})

//* GRID DISPLAY
function setUpContainer() {
  let spContainer = document.getElementById('spContainer');
  let gtContainer = document.getElementById('gtContainer');
  let main = document.querySelector('main');

  main.classList.add("mFix")
  // spContainer.classList.add("hFix")
  // gtContainer.classList.add("hFix")
  if (!((spContainer.clientHeight + gtContainer.clientHeight + 159) > window.innerHeight)) {
    spContainer.classList.add("hFix")
    gtContainer.classList.add("hFix")
    main.classList.remove("mFix")
  }
}

//* SPEISEN
function addSpeisen() {
  const flammkuchen = speisen[0];
  
  flammkuchen.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.setAttribute('data-id', product.id);
    productDiv.innerHTML = `
      <div class="spText">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div>
        <img src="img/pic/fl_temp1.png">
      </div>
    `;
      
    //<img src="img/pic/fl_${product.id}.jpg">

    // if (product.type) {
    // } else {
    // }

    document.getElementById('spGrid').appendChild(productDiv);
  });
}

function addGetraenke() {
  const getraenke = speisen[1];

  const flammkuchen = speisen[0];
  
  flammkuchen.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.setAttribute('data-id', product.id);
    productDiv.innerHTML = `
      <div class="spText">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div>
        <img src="img/pic/fl_temp1.png">
      </div>
    `;
      
    //<img src="img/pic/fl_${product.id}.jpg">

    // if (product.type) {
    // } else {
    // }

    document.getElementById('gtGrid').appendChild(productDiv);
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
  
  openOverlay(speiseId, speise.name, speise.description, speise.type)
}

function openOverlay(id, name, description, isSweet) {
  const overlay = document.getElementById('overlay');

  document.getElementById('ocImg').src = 'img/pic/start_fl.png';
  document.getElementById('ocHead').innerHTML = 'Flammkuchen '+name;
  document.getElementById('ocDesc').innerHTML = description;

  //<img src="img/pic/fl_${product.id}.jpg">

  overlay.classList.add('active');
}

function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('active');
}