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

function setLabelStyle(str, label) {
  const isEmpty = !str.trim().length;
  if (isEmpty) {
      if (window.matchMedia('(max-width: 1023px)').matches) {
          label.style.top = '15px';
      } else {
          label.style.top = '0';
      }
      label.style.fontSize = '16px';
      label.style.lineHeight = '24px';
  } else {
      if (window.matchMedia('(max-width: 1023px)').matches) {
          label.style.top = '-6px';
      } else {
          label.style.top = '-18px'; 
      }
      label.style.fontSize = '13px';
      label.style.lineHeight = '16px';
  }
}

export {getNoun, getPriceSpaces, getPriceNoSpaces, setLabelStyle};