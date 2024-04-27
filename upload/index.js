const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const reader = new FileReader();

function save() {
  file = document.querySelector('input[type=file]').files[0];
  reader.addEventListener('load', (res) => {
    image = JSON.stringify({
      url: res.target.result,
      name: file.name,
    });
    try {
      localStorage.setItem(params.id, LZString.compress(image));
    } catch (e) {
      document.getElementById('error').style.setProperty('display', 'block');
    }
    location.href = '/cards';
  });
  reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', () => {
  if (params.answer == 'true') {
    document.querySelector('body > p').style.setProperty('display', 'none');
    document.querySelector('form > p').innerHTML = data[params.id].task;
    document.querySelector('input[type=file]').addEventListener('change', save);
    document.querySelector('button').addEventListener('click', save);
  } else {
    if (params.id) {
      document.querySelector('a').href += params.id;
    } else {
      document.querySelector('a').href = '/cards';
    }

    document.querySelector('form').style.display = 'none';
  }
});
