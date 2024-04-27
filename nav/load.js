const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    $(xhttp.responseText).appendTo($('body'));
  }
};
xhttp.open('GET', '/nav/index.html', true);
xhttp.send();
