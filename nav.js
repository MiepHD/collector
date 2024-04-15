function changeTo(dest) {
  for (elem of $('div[data-page]')) {
    elem.style.display =
      elem.getAttribute('data-page') == dest ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeTo('list');
  for (elem of $('nav > div')) {
    elem.addEventListener('click', (e) => {
      changeTo(e.currentTarget.getAttribute('data-dest'));
    });
  }
});
