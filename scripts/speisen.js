let speisen;

document.addEventListener("DOMContentLoaded", async function () {
    speisen = await getSpeisen();
    addSpeisen();

    let spGrid = document.getElementById('spGrid');
    spGrid.addEventListener('click', function(event) {
      let product = event.target.closest('#spGrid>div')
    
    if (product) {
      showSpeise(product.getAttribute('data-id'))
    }

    let overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closeOverlay()
        }
    });
});
})

//* SPEISEN
async function getSpeisen() {
  try {
    const response = await fetch('/data/speisen.json');
    const jsonData = await response.json();
    const products = jsonData.products;

    console.log(products);
    return products;

  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
  }
}

function addSpeisen() {
  const products = speisen;
  
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.setAttribute('data-id', product.id);
    productDiv.innerHTML = `
      <div class="spText">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div>
        <img src="/img/pic/fl_temp1.png">
      </div>
    `;
      
    //<img src="/img/pic/fl_${product.id}.jpg">

    // if (product.type) {
    // } else {
    // }

    document.getElementById('spGrid').appendChild(productDiv);
  });
}

function showSpeise(speiseId) {
  console.log(speiseId);
  
  openOverlay()
}

function openOverlay() {
  const overlay = document.getElementById('overlay');

  // TODO: speisen details as parameters, load them into overlay by getting elements with id
  
  overlay.style.display = 'flex';
}

function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}