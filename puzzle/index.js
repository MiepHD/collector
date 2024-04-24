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
  document
    .querySelector('body')
    .style.setProperty('--size', Math.round(Math.sqrt(data.length)));
});
