console.log(Object.keys(localStorage))

getAllIdeas();

$('.input-title').focus();

$('.lists').on('click', function(event) {
  deleteCard(event);
  upvote(event);
  downvote(event);
});

$('.input-submit').on('click', function(){
  event.preventDefault()
  var card = new Card($('.input-title').val(), $('.input-body').val())
  addCard(card);
  clearInputs()
})

function Card (title, body) {
  this.title = title;
  this.body = body;
  this.quality ='swill'
  this.storageId = Date.now();
};

function upvote(event) {
  var retrievedCard = getCard(event);
  var upvoteTarget = event.target.classList.contains('upvote-button');
  if (upvoteTarget && retrievedCard.quality === 'swill') {
    retrievedCard.quality = 'plausible';
    var stringifiedCard = JSON.stringify(retrievedCard);
    $(event.target).siblings('.card-quality').text('Quality: plausible');
  } else if (upvoteTarget && retrievedCard.quality === 'plausible') {
    retrievedCard.quality = 'genius';
    var stringifiedCard = JSON.stringify(retrievedCard);
    $(event.target).siblings('.card-quality').text('Quality: genius');
  } else {
    return; 
  }
  localStorage.setItem(retrievedCard.storageId, stringifiedCard);
};

function downvote(event) {
  var retrievedCard = getCard(event);
  var downvoteTarget = event.target.classList.contains('downvote-button');
  if (downvoteTarget && retrievedCard.quality === 'genius') {
    retrievedCard.quality = 'plausible';
    var stringifiedCard = JSON.stringify(retrievedCard);
    $(event.target).siblings('.card-quality').text('Quality: plausible');
  } else if (downvoteTarget && retrievedCard.quality === 'plausible') {
    retrievedCard.quality = 'swill';
    var stringifiedCard = JSON.stringify(retrievedCard);
    $(event.target).siblings('.card-quality').text('Quality: swill');
  } else {
    return; 
  }
  localStorage.setItem(retrievedCard.storageId, stringifiedCard);
};
      
function addCard(card) {
  var stringifiedCard = JSON.stringify(card);
  var stringId = card.storageId.toString();
  var newCard = `
  <article class="new-card">
  <h2 contenteditable="true">${card.title}</h2>
  <button class="delete-button"></button>
  <p contenteditable="true">${card.body}</p>
  <p id="storage-id" class="${card.storageId}" hidden></p>
  <button class="upvote-button"></button>
  <button class="downvote-button"></button>
  <h4 class="card-quality">Quality: ${card.quality}</h4>
  <hr>`

  localStorage.setItem(card.storageId, stringifiedCard)
  $('.lists').prepend(newCard)
};
      
function getAllIdeas() {
  var localArray = Object.keys(localStorage);
  for (i = 0; i < localArray.length; i++) {
    addCard(JSON.parse(localStorage.getItem(localArray[i])));
  }
}

function clearInputs() {
  $('.input-title').val('')
  $('.input-body').val('')
  $('.input-title').focus()
};

function deleteCard(event) {
  var cardId = $(event.target).siblings('#storage-id').attr('class');
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove()
    JSON.parse(localStorage.removeItem(cardId));
  }
};

function getCard(event) {
  var cardId = $(event.target).siblings('#storage-id').attr('class');
  var retrievedCard = JSON.parse(localStorage.getItem(cardId));
  return retrievedCard;
}