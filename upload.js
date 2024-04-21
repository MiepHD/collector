const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
document.addEventListener('DOMContentLoaded', () => {
  if (params.answer == 'true') {
    document.querySelector('input[type=number]').value = params.id;
    document.querySelector('input[type=file]').click();
    document
      .querySelector('input[type=file]')
      .addEventListener('change', () => {
        document.querySelector('input[type=submit]').click();
      });
  } else {
    document.querySelector('a').href += params.id;
    document.querySelector('form').style.display = 'none';
  }
});
