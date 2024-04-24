function submit() {
  console.log('submitted');
}
document.addEventListener('DOMContentLoaded', () => {
  id = 0;
  for (card of data) {
    elem = $(`
        <form class="card" style="background-image: url(${
          localStorage.getItem(id)
            ? 'data:image/gif;base64,' + localStorage.getItem(id)
            : card.image
        })" action="./questions.html">
          <input type="submit" />
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
});
