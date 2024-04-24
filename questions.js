const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
id = params.id;
if (!id) location.href = './index.html';

getQuestions = (data) => {
  q = '';
  for (i = 0; i < data[id].answers.length; i++) {
    q += `
      <input id="q${i}" type="radio" name="answer" value="${data[id].answers[i].bool}">
      <label for="q${i}">${data[id].answers[i].text}</label>
    `;
  }
  return q;
};

document.addEventListener('DOMContentLoaded', () => {
  $(`
    <h1>${data[id].title}</h1>
    <form action="./upload.html">
        <input type="hidden" name="id" value="${id}" />
        <p>${data[id].question}</p>
        ${getQuestions(data)}
        <input type="submit">
    </form>
  `).appendTo('body');
});
