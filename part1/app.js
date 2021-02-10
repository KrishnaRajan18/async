let favNumber = 5;
let baseURL = "http://numbersapi.com";


async function getFavNum() {
  let data = await $.getJSON(`${baseURL}/${favNumber}/trivia?json`);
 
  let $h1 = $("<h1>").text(data.text);
  $("body").append($h1);
}
getFavNum();


const favNumbers = [7, 11, 22,8];
async function multipleNum() {
  const nums = favNumbers.join(",");
  let data = await axios.get(`${baseURL}/${nums}?json`)
  favNumbers.forEach(num => {
    let $h2 = $("<li>").text(data.data[num]);
    $("body").append($h2);
});
}
multipleNum();


async function favFourFact() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
favFourFact();