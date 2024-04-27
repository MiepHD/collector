const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const reader = new FileReader();

function resize(imagePath, callback) {
  const originalImage = new Image();
  originalImage.src = imagePath;
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  originalImage.addEventListener('load', () => {
    const originalWidth = originalImage.naturalWidth;
    const originalHeight = originalImage.naturalHeight;
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    ctx.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    callback(document.querySelector('canvas').toDataURL('image/jpeg', 0.3));
  });
}

showError = () => {
  document.getElementById('error').style.setProperty('display', 'block');
};

function save() {
  file = document.querySelector('input[type=file]').files[0];
  reader.addEventListener('load', (res) => {
    const image = res.target.result;
    try {
      localStorage.setItem(params.id + '_original', LZString.compress(image));
    } catch (e) {
      showError();
    }
    resize(image, (resized) => {
      compressed = false;
      try {
        localStorage.setItem(params.id + '_thumb', resized);
      } catch (e) {
        try {
          localStorage.setItem(
            params.id + '_thumb',
            LZString.compress(resized)
          );
          compressed = true;
        } catch (e) {
          showError();
        }
      }
      info = JSON.stringify({
        compressed: compressed,
        name: file.name,
      });
      localStorage.setItem(params.id + '_data', info);
      location.href = '/cards';
    });
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
