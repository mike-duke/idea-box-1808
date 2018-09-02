$('.input-title').focus();
$('.lists').on('click', function(event) {
  deleteCard(event)
  // upvote(event)
  downvote(event)
});

$('.input-submit').on('click', function(){
  var card = new Card($('.input-title').val(), $('.input-body').val())
  event.preventDefault()
  addCard(card)
  clearInputs()
})

function Card (title, body) {
  this.title= title;
  this.body= body;
  this.quality='swill'
};

 function upvote(card) {
  console.log(event.target.parentNode)
  var upvoteTarget = event.target.classList.contains('upvote-button')
  // var quality = event.target.innerText.
  if (upvoteTarget) {
    this.quality = 'plausible'
  } else if (upvoteTarget && card.quality === 'plausible') {
    this.quality = 'genius'
  }
};

function downvote(event) {
  var downvoteTarget = event.target.classList.contains('downvote-button')
  var quality = $('.card-quality')
  if (downvoteTarget && quality) {
    console.log('click')
  } else if (downvoteTarget && this.quality === 'plausible') {
    this.quality = 'swill'
  }
};

function addCard(card) {
  var newCard = `
    <article class="new-card">
      <h2 contenteditable="true">${card.title}</h2>
      <button class="delete-button"></button>
      <p contenteditable="true">${card.body}</p>
      <button class="upvote-button"></button>
      <button class="downvote-button"></button>
      <h4 class="card-quality">Quality: ${card.quality}</h4>
      <hr>`
  $('.lists').prepend(newCard)
};

function clearInputs() {
  $('.input-title').val('')
  $('.input-body').val('')
  $('.input-title').focus()
};

function deleteCard(event) {
  console.log(event.target.parentNode)
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove()
  }
};