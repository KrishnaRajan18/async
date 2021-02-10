const BASE_URL = "https://deckofcardsapi.com/api";
let deckId = "";
async function cardDraw() {
  let response = await axios.get(`${BASE_URL}/deck/new/draw/`);
  let cards = response.data["cards"];
  for (let card of cards) {
    let value = card["value"];
    let suit = card["suit"];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
}

async function drawCardsFromDeck() {
  let response1 = await axios.get(`${BASE_URL}/deck/new/shuffle/`);
  deckId = response1.data["deck_id"];
  let response2 = await axios.get(`${BASE_URL}/deck/${deckId}/draw/`);
  let cards = response2.data["cards"];

  for (let card of cards) {
    let value = card["value"];
    let suit = card["suit"];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
}

$(async function () {
  let resp = await axios.get(`${BASE_URL}/deck/new/shuffle/`);
  deckId = resp.data["deck_id"];
  if (deckId) {
    $("#card-button").show();
  }

  $("#card-button").on("click", async function () {
    let $cardDiv = $("#game");
    let $img = $("<img>");
    resp = await axios.get(`${BASE_URL}/deck/${deckId}/draw/`);
    if (resp.data["success"]) {
      for (let card of resp.data["cards"]) {
        $img.attr("src", card["image"]);
        $cardDiv.prepend($img);
      }
    } else {
        $cardDiv.prepend("<h2>All cards drawn</h2>");
        $("#card-button").hide();
    }
  });
});