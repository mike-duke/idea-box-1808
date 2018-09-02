$('.input-title').focus()
$('.lists').on('click', function(event) {
  deleteCard(event)
});
$('.input-submit').on('click', function(){
  event.preventDefault()
  addCard()
  clearInputs()
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
      <h2 contenteditable="true">${card.title}</h2>
      <button class="delete-button"></button>
      <p contenteditable="true">${card.body}</p>
      <button class="upvote-button"></button>
      <button class="downvote-button"></button>
      <h4>Quality: ${card.quality}</h4>
      <hr>`
  $('.lists').prepend(newCard)
}

function clearInputs() {
  $('.input-title').val('')
  $('.input-body').val('')
  $('.input-title').focus()
}

function deleteCard(event) {
  console.log(event.target.parentNode)
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove()
  }
}