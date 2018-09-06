// get all ideas from localStorage and add them to the DOM
getAllIdeas();

// set cursor on title input field
$('.input-title').focus();

// event listeners
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

$('.lists').on('input', function(event) {
  editIdea(event);
});

$('.lists').on('keydown', function(event) {
  if (event.keyCode === 13) {
    event.target.blur()
  }
})

// constructor function
function Card (title, body) {
  this.title = title;
  this.body = body;
  this.quality ='swill'
  this.storageId = Date.now();
};
      
// function to create card on DOM and store card in localStorage
function addCard(card) {
  var stringifiedCard = JSON.stringify(card);
  var stringId = card.storageId.toString();
  var newCard = `
  <article class="new-card">
  <h2 class="card-title" contenteditable="true">${card.title}</h2>
  <button class="delete-button"></button>
  <p class="card-body" contenteditable="true">${card.body}</p>
  <p id="storage-id" class="${card.storageId}" hidden></p>
  <button class="upvote-button"></button>
  <button class="downvote-button"></button>
  <h4 class="card-quality">Quality: ${card.quality}</h4>
  <hr>`

  localStorage.setItem(card.storageId, stringifiedCard)
  $('.lists').prepend(newCard)
};
      
// function to grab all of the ideas in localStorage
function getAllIdeas() {
  var localArray = Object.keys(localStorage);
  for (i = 0; i < localArray.length; i++) {
    addCard(JSON.parse(localStorage.getItem(localArray[i])));
  }
}

// function to get the card from localStorage
function getCard(event) {
  var cardId = $(event.target).siblings('#storage-id').attr('class');
  var retrievedCard = JSON.parse(localStorage.getItem(cardId));
  return retrievedCard;
}

// function to clear inputs and ready the cursor
function clearInputs() {
  $('.input-title').val('')
  $('.input-body').val('')
  $('.input-title').focus()
};

// function to run the delete button on the card
function deleteCard(event) {
  var cardId = $(event.target).siblings('#storage-id').attr('class');
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove()
    JSON.parse(localStorage.removeItem(cardId));
  }
};

// function to run the upvote button
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

// function to run the downvote button
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

function editIdea(event) {
  var card = getCard(event);
  if (event.target.classList.contains('card-title')) {
    card.title = $('.card-title').text();
    localStorage.setItem(card.storageId, JSON.stringify(card));
  } else if (event.target.classList.contains('card-body')) {
    card.body = $('.card-body').text();
    localStorage.setItem(card.storageId, JSON.stringify(card));
  }
}