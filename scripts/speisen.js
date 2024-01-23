document.addEventListener("DOMContentLoaded", async function () {
    addSpeisen();

    let spGrid = document.getElementById('spGrid');
    spGrid.addEventListener('click', function(event) {
      let product = event.target.closest('#spGrid>div')
    
    if (product) {
      showSpeise(product.getAttribute('data-id'))
    }
});
})

//* SPEISEN
async function addSpeisen() {
  try {
    const response = await fetch('/data/speisen.json');
    const jsonData = await response.json();
    const products = jsonData.products;

    console.log(products);

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

  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
  }
}

function showSpeise(speiseId) {
  console.log(speiseId);

  // TODO: create overlay to show speise
}