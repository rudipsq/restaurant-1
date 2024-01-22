document.addEventListener("DOMContentLoaded", async function () {
    addSpeisen();
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

        if (product.type) {
        } else {
        }

        document.getElementById('spGrid').appendChild(productDiv);
    });

  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
  }
}