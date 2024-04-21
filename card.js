var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  } else if (this.readyState == 4 && this.status == 404) {
  }
};
document.addEventListener('DOMContentLoaded', () => {
  xhttp.open('GET', user + '/' + id + '.png', true);
  xhttp.send();
  for (form of document.querySelectorAll('form')) {
    form.addEventListener(
      'click',
      (e) => {
        e.currentTarget.children[0].click();
      },
      { once: true }
    );
  }
});
