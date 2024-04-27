function primeFactors(n) {
  const factors = [];
  let divisor = 2;
  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

document.addEventListener('DOMContentLoaded', () => {
  for (i = 0; i < data.length; i++) {
    $(
      `<div${
        localStorage.getItem(i) != undefined
          ? " style='visibility: hidden'"
          : ''
      }></div>`
    ).appendTo('body > div');
  }
  const factors = primeFactors(data.length);
  console.log(factors);
  a = 1;
  b = 1;
  while (factors.length > 0) {
    if (factors.length > 0 && b <= a) b *= factors.splice(-1, 1)[0];
    if (factors.length > 0 && a <= b) a *= factors.splice(0, 1)[0];
  }
  console.log(a);
  console.log(b);
  document.querySelector('body').style.setProperty('--size', b);
});
