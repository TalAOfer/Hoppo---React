export const utils = {
  getRandomInt,
  debounce,
  // loadImage
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
  }

  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  // async function loadImage(url, img) {
  //   return new Promise((resolve, reject) => {
  //     img.onload = () => resolve(img);
  //     img.onerror = reject;
  //     img.src = url;
  //   });
  // }