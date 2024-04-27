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

function saveSplitted(key, val) {
  count = 0;
  oi = 0;
  for (i = 100000; i < val.length; i + 100000) {
    if (i >= val.length) i = val.length - 1;
    sub = val.substr(oi, i);
    console.log(sub.length);
    localStorage.setItem(key + '-' + count, sub);
    oi = i + 1;
    count++;
  }
  return count;
}

function saveResized(resized) {
  try {
    localStorage.setItem(params.id + '_thumb', resized);
  } catch (e) {
    try {
      localStorage.setItem(params.id + '_thumb', LZString.compress(resized));
      return true;
    } catch (e) {
      return resize(resized, saveResized);
    }
  }
  return false;
}

showError = () => {
  document.getElementById('error').style.setProperty('display', 'block');
};

function save() {
  file = document.querySelector('input[type=file]').files[0];
  reader.addEventListener('load', (res) => {
    const image = res.target.result;
    const dataToSave = LZString.compress(image);
    console.log(dataToSave.length);
    try {
      localStorage.setItem(params.id + '_original', dataToSave);
    } catch (e) {
      saveSplitted(params.id + '_original', dataToSave);
    }
    const compressed = resize(image, saveResized);
    info = JSON.stringify({
      compressed: compressed,
      name: file.name,
    });
    localStorage.setItem(params.id + '_data', info);
    //location.href = '/cards';
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
