async function getSpeisen() {
  try {
    // console.warn("version uses direct links")
    // let response = await fetch('https://rudipsq.github.io/restaurant-1/data/speisen.json');
    let response = await fetch('/data/speisen.json');
    let jsonData = await response.json();
    const fl = jsonData.flammkuchen;

    return fl;

  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    // return null
  }
}