var title = $('.input-title');
console.log(title);

$('.input-submit').on('click', function(){
  event.preventDefault()
  addCard()
})

function Card (title, body) {
  this.title= title;
  this.body=body;
}

function addCard() {
  var card = new Card($('.input-title'), $('.input-body'))
  console.log(card)
}