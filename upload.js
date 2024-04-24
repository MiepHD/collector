const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const reader = new FileReader();

reader.addEventListener('loadend', () => {
  base64 = btoa(reader.result);
  localStorage.setItem(params.id, base64);
  location.href = './index.html';
});

document.addEventListener('DOMContentLoaded', () => {
  if (params.answer == 'true') {
    document.querySelector('input[type=number]').value = params.id;
    document.querySelector('input[type=file]').click();
    document
      .querySelector('input[type=file]')
      .addEventListener('change', (e) => {
        reader.readAsBinaryString(e.currentTarget.files[0]);
      });
  } else {
    if (params.id) {
      document.querySelector('a').href += params.id;
    } else {
      document.querySelector('a').href = './index.html';
    }

    document.querySelector('form').style.display = 'none';
  }
});
