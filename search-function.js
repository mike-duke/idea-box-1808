$('.input-search').on('keydown', function(event) {
  searchArray(event);
})

function searchArray() {
  var localArray = Object.keys(localStorage);
  var parsedArray = [];
  for (i = 0; i < localArray.length; i++) {
    parsedArray.push(JSON.parse(localStorage.getItem(localArray[i])));
  }
  searchTitle(parsedArray);
}


function searchTitle(array) {
  var titleArray = [];
  for (i = 0; i < array.length; i++) {
    titleArray.push(array[i].title)
  }
  filterTitle(titleArray);
}

function filterTitle(array) {
  for (i = 0; i < array.length; i++) {
    if ($('.input-search').val() !== array[i].charAt(0)) {
      $(event.target).parent().toggleClass('hidden');
    }
  }
}

// Sure, here's the function that runs, hopefully helpful without context..
// function filterResults(event) {
//   var searchInput = $('.search-input').val().toLowerCase();
//   var ideaArray = $('.idea-card');
//   for (var i = 0; i < ideaArray.length; i++) {
//     if ($(ideaArray[i].children[0]).text().toLowerCase().indexOf(searchInput) === -1 && 
          // $(ideaArray[i].children[2]).text().toLowerCase().indexOf(searchInput) === -1) {
//       $(ideaArray[i]).slideUp();
//     } else {
//       $(ideaArray[i]).slideDown();
//     }
//   }
// }

for (i = 0; i < cardArray.length; i++) {
  if ($(cardArray[i]).children('.card-title').text().includes($('.input-search').val()) === false) {
    console.log('yes');
    $(cardArray[i]).attr('hidden');
  }
}