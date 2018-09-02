$('.input-submit').on('click', function(){
  event.preventDefault()
  addCard()
})

function Card (title, body) {
  this.title= title;
  this.body= body;
  this.quality='swill'
}

function addCard() {
  var card = new Card($('.input-title').val(), $('.input-body').val())
  var newCard = `
    <article class="new-card">
      <h2>${card.title}</h2>
      <button>Delete</button>
      <p>${card.body}</p>
      <button>Up</button>
      <button>Down</button>
      <h4>Quality: ${card.quality}</h4>`
  $('.lists').prepend(newCard)

}