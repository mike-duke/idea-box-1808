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