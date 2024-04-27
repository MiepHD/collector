function submit() {
  console.log('submitted');
}
document.addEventListener('DOMContentLoaded', () => {
  for (key in localStorage) {
    const num = parseInt(key);
    console.log(num);
    if (!(num < data.length && num > -1) || !/^\d+$/.test(key))
      localStorage.removeItem(key);
  }
  id = 0;
  for (card of data) {
    entry = localStorage.getItem(id);
    image = undefined;
    if (entry) {
      try {
        image = JSON.parse(entry);
      } catch {
        localStorage.removeItem(id);
        location.reload();
      }
    }
    dataURL = image ? image.url : undefined;
    elem = $(`
        <form class="card"${
          dataURL != undefined
            ? ' style="background-image: url(' + dataURL + ')"'
            : ''
        } action="/questions/index.html">
        <input type="submit" />
        ${
          image
            ? '<div data-id="' +
              id +
              '" class="controls delete"><img src="/assets/delete.png"></div>'
            : ''
        }
        <div class="space"></div>
        ${dataURL != undefined ? '' : '<p>' + card.description + '</p>'}
        <div class="space"></div>
          <input type="hidden" value="${id}" name="id"/>
        </form>
      `);
    elem.appendTo($('body'));
    id++;
  }
  i = 0;
  for (elem of document.querySelectorAll('.space')) {
    if (elem.clientHeight == 0) i++;
  }
  if (i > 0)
    $(
      `<p style="color:red"">${i / 2} space elements are too small!</p>`
    ).appendTo($('body'));
  if (i > 0) console.log(`${i} space elements are too small!`);

  for (form of document.querySelectorAll('form')) {
    form.addEventListener(
      'click',
      (e) => {
        e.currentTarget.children[0].click();
        console.log(e.currentTarget);
      },
      { once: true }
    );
  }
  for (button of document.querySelectorAll('.delete')) {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.currentTarget.getAttribute('data-id');
      localStorage.removeItem(id);
      location.reload();
    });
  }
});
