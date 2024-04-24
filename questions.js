const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
id = params.id;
document.addEventListener('DOMContentLoaded', () => {
  $(`
    <h1>${data[id].title}</h1>
    <form action="./upload.html">
        <input type="hidden" name="id" value="${id}" />
        <p>${data[id].question}</p>
        <label for="a">${data[id].answers[0].text}</label>
        <input id="a" type="radio" name="answer" value="${data[id].answers[0].bool}">
        <label for="a">${data[id].answers[1].text}</label>
        <input id="a" type="radio" name="answer" value="${data[id].answers[1].bool}">
        <label for="a">${data[id].answers[2].text}</label>
        <input id="a" type="radio" name="answer" value="${data[id].answers[2].bool}">
        <input type="submit">
    </form>
  `).appendTo('body');
});
