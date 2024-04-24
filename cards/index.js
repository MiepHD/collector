function submit() {
  console.log('submitted');
}
document.addEventListener('DOMContentLoaded', () => {
  id = 0;
  for (card of data) {
    elem = $(`
        <form class="card" style="background-image: url(data:image/gif;base64,${localStorage.getItem(
          id
        )})" action="/questions">
        <input type="submit" />
        <div class="space"></div>
        ${
          localStorage.getItem(id) != undefined
            ? ''
            : '<p>' + card.description + '</p>'
        }
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
});
