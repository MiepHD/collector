function submit() {
  console.log('submitted');
}
document.addEventListener('DOMContentLoaded', () => {
  for (key in localStorage) {
    const arr = key.split('_');
    const num = parseInt(arr[0]);
    if (
      !(
        num < data.length &&
        num > -1 &&
        (arr[1] == 'data' || arr[1] == 'thumb' || arr[1] == 'original') &&
        localStorage.getItem(num + '_data') != undefined &&
        localStorage.getItem(num + '_thumb') != undefined &&
        localStorage.getItem(num + '_original') != undefined
      )
    )
      localStorage.removeItem(key);
  }
  id = 0;
  for (card of data) {
    entry = localStorage.getItem(id + '_data');
    image = undefined;
    if (entry) {
      try {
        info = JSON.parse(entry);
        raw = localStorage.getItem(id + '_thumb');
        thumb = info.compressed == 'true' ? LZString.decompress(raw) : raw;
        image = {
          url: thumb,
          name: info.name,
        };
      } catch {
        localStorage.removeItem(id + '_data');
        localStorage.removeItem(id + '_thumb');
        localStorage.removeItem(id + '_original');
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
            ? '<div class="controls download" download="' +
              image.name +
              '.png" data-id="' +
              id +
              '"><img src="/assets/download.png"></div><div data-id="' +
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
      localStorage.removeItem(id + '_data');
      localStorage.removeItem(id + '_thumb');
      localStorage.removeItem(id + '_original');
      location.reload();
    });
  }
  for (button of document.querySelectorAll('.download')) {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const raw = localStorage.getItem(
        e.currentTarget.getAttribute('data-id') + '_original'
      );
      const url = LZString.decompress(raw);
      const link = document.querySelector('body > a');
      link.setAttribute('download', e.currentTarget.getAttribute('download'));
      link.setAttribute('href', url);
      link.click();
    });
  }
});
