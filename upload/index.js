const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const reader = new FileReader();
reader.addEventListener('load', (e) => {
  localStorage.setItem(params.id, e.target.result);
  location.href = '/cards';
});

document.addEventListener('DOMContentLoaded', () => {
  if (params.answer == 'true') {
    document.querySelector('form > p').innerHTML = data[params.id].task;
    document
      .querySelector('input[type=file]')
      .addEventListener('change', (e) => {
        reader.readAsDataURL(e.currentTarget.files[0]);
      });
  } else {
    if (params.id) {
      document.querySelector('a').href += params.id;
    } else {
      document.querySelector('a').href = '/cards';
    }

    document.querySelector('form').style.display = 'none';
  }
});
