function submit() {
  console.log('submitted');
}
document.addEventListener('DOMContentLoaded', () => {
  id = 0;
  for (card of data) {
    elem = $(`
        <form id="i${id}" class="card" style="background-image: url(assets/${card.background}); --show-questions: none">
          <input type="file" accept=".gif,.jpg,.jpeg,.png">
          <div class="space"></div>
          <p>${card.description}</p>
          <div class="space"></div>
          <input id="a" type="radio" name="answer" value="true">
          <label for="a">A<//label>
          <input id="b" type="radio" name="answer" value="false">
          <label for="b">B<//label>
          <input id="c" type="radio" name="answer" value="false">
          <label for="c">C<//label>
          <button type="button">Submit</button>
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
        e.currentTarget.style.setProperty('--show-description', 'none');
        e.currentTarget.style.setProperty('--show-questions', 'block');
      },
      { once: true }
    );
  }
  for (button of document.querySelectorAll('button')) {
    button.addEventListener('click', (e) => {
      console.log(e.currentTarget.parentElement);
      e.currentTarget.parentElement.style.setProperty(
        '--show-description',
        'block'
      );
      e.currentTarget.parentElement.style.setProperty(
        '--show-questions',
        'none'
      );
      console.log(e.currentTarget.parentElement.id);
      if (
        document.querySelector(
          `#${e.currentTarget.parentElement.id} > input[name=answer]:checked`
        ).value == 'true'
      ) {
        document
          .querySelector(
            `#${e.currentTarget.parentElement.id} > input[type=file]`
          )
          .click();
      } else {
        e.currentTarget.parentElement.addEventListener(
          'click',
          (e) => {
            e.currentTarget.style.setProperty('--show-description', 'none');
            e.currentTarget.style.setProperty('--show-questions', 'block');
          },
          { once: true }
        );
      }
    });
  }
});
