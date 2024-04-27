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
    const ratio = originalWidth / originalHeight;
    canvas.width = 300;
    canvas.height = 300 / ratio;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    callback(document.querySelector('canvas').toDataURL('image/jpeg', 0.3));
  });
}

function save() {
  file = document.querySelector('input[type=file]').files[0];
  reader.addEventListener('load', (res) => {
    const image = res.target.result;
    resize(image, (resized) => {
      info = JSON.stringify({
        url: resized,
        name: file.name,
      });
      localStorage.setItem(params.id, info);
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
  } else {
    if (params.id) {
      document.querySelector('a').href += params.id;
    } else {
      document.querySelector('a').href = '/cards';
    }

    document.querySelector('form').style.display = 'none';
  }
});
