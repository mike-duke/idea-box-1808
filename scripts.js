var qualityArray = ['swill', 'plausible', 'genius'];

// get all ideas from localStorage and add them to the DOM
getAllIdeas();

// set cursor on title input field
$('.input-title').focus();

$('.input-title').on('keyup', function(event) {
  if ($('.input-title').val() !== '' && $('.input-body').val() !== '') {
    enableSaveButton();
  }
})

$('.input-submit').on('click', function(){
  event.preventDefault();
  var idea = new Idea($('.input-title').val(), $('.input-body').val());
  addCard(idea);
  clearInputs();
});

$('.input-body').on('keydown', function() {
  if ($('.input-title').val() !== '' && $('.input-body').val() !== '') {
    enableSaveButton();
  }
})

$('.lists').on('click', function(event) {
  deleteCard(event);
  upvote(event);
  downvote(event);
});


$('.lists').on('input', function(event) {
  editIdea(event);
});

$('.lists').on('keydown', function(event) {
  if (event.keyCode === 13) {
    event.target.blur();
  }
});

$('.input-search').on('keyup', function(event) {
  searchIdeas(event);
})

// constructor function
function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 0;
  this.storageId = Date.now();
}
      
// function to create card on DOM and store card in localStorage
function addCard(idea) {
  var newCard = `
  <article class="new-card">
    <h2 class="card-title" contenteditable="true">${idea.title}</h2>
    <button class="delete-button"></button>
    <p class="card-body" contenteditable="true">${idea.body}</p>
    <p id="storage-id" class="${idea.storageId}" hidden></p>
    <button class="upvote-button"></button>
    <button class="downvote-button"></button>
    <h4 class="card-quality">Quality: ${qualityArray[idea.quality]}</h4>
    <hr>
  </article>`;

  $('.lists').prepend(newCard);
  storeIdea(idea);
}
      
function enableSaveButton() {
  $('.input-submit').removeAttr('disabled');
}

function checkInputs() {}

// function to grab all of the ideas in localStorage
function getAllIdeas() {
  var localArray = Object.keys(localStorage);
  for (i = 0; i < localArray.length; i++) {
    addCard(JSON.parse(localStorage.getItem(localArray[i])));
  }
}

function storeIdea(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  var stringId = idea.storageId.toString();
  localStorage.setItem(idea.storageId, stringifiedIdea)
}

// function to get the card from localStorage
function getIdea(event) {
  console.log('event target', $(event.target).siblings())
  var cardId = $(event.target).siblings('#storage-id').attr('class');
  console.log('card ID', cardId)
  var retrievedCard = JSON.parse(localStorage.getItem(cardId));
  console.log('retrieved card', retrievedCard);
  return retrievedCard;
}

// function to clear inputs and ready the cursor
function clearInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
  $('.input-title').focus();
  $('.input-submit').attr('disabled');
}

// function to run the delete button on the card
function deleteCard(event) {
  var cardId = $(event.target).siblings('#storage-id').attr('class');
  if (event.target.classList.contains('delete-button')) {
    localStorage.removeItem(cardId);
    event.target.parentNode.remove();
  }
}

// function to run the upvote button
function upvote(event) {
  console.log('event', event)
  var retrievedIdea = getIdea(event);
  console.log('idea', retrievedIdea)
  var upvoteTarget = event.target.classList.contains('upvote-button');

  if (retrievedIdea.quality === 2) {
    return;
  }
  
  if (upvoteTarget && retrievedIdea.quality === 0) {
    retrievedIdea.quality++;
    $(event.target).siblings('.card-quality').text(`Quality: ${qualityArray[retrievedIdea.quality]}`);
  } else if (upvoteTarget && retrievedIdea.quality === 1) {
    retrievedIdea.quality++;
    $(event.target).siblings('.card-quality').text(`Quality: ${qualityArray[retrievedIdea.quality]}`);
  } else {
    return; 
  }
  var stringifiedIdea = JSON.stringify(retrievedIdea);
  localStorage.setItem(retrievedIdea.storageId, stringifiedIdea);
}

// function to run the downvote button
function downvote(event) {
  var retrievedIdea = getIdea(event);
  var downvoteTarget = event.target.classList.contains('downvote-button');

  if (retrievedIdea.quality === 0) {
    return;
  }
  
  if (downvoteTarget && retrievedIdea.quality === 2) {
    retrievedIdea.quality--;
    $(event.target).siblings('.card-quality').text(`Quality: ${qualityArray[retrievedIdea.quality]}`);
  } else if (downvoteTarget && retrievedIdea.quality === 1) {
    retrievedIdea.quality--;
    $(event.target).siblings('.card-quality').text(`Quality: ${qualityArray[retrievedIdea.quality]}`);
  } else {
    return; 
  }
  var stringifiedIdea = JSON.stringify(retrievedIdea);
  localStorage.setItem(retrievedIdea.storageId, stringifiedIdea);
}

//function to allow card edits to store to localStorage
function editIdea(event) {
  var idea = getIdea(event);
  var textToChange;
  if (event.target.classList.contains('card-title')) {
    textToChange = 'title';
  } else if (event.target.classList.contains('card-body')) {
    textToChange = 'body';
  }
  idea[textToChange] = $(event.target).text();
  localStorage.setItem(idea.storageId, JSON.stringify(idea));
}

function searchIdeas(event) {
  $('.new-card').map(function() {
    var trueTitle = $(this).children('.card-title').text().includes($('.input-search').val());
    var trueBody = $(this).children('.card-body').text().includes($('.input-search').val()); 
    $(this).toggle(trueTitle || trueBody);
  })
}