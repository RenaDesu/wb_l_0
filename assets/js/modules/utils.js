function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  function getPriceSpaces(price) {
    const priceSpaces = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return priceSpaces;
}

function getPriceNoSpaces(price) {
  const priceText = price.innerText;
  const priceTextNoSpaces = priceText.replace(/[^0-9]/g, '');
  return parseInt(priceTextNoSpaces);
}

  export {getNoun, getPriceSpaces, getPriceNoSpaces};