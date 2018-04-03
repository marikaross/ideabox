$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');
// $ideaQuality = $('.quality');
// $upVoteButton = $('.up-vote');
// $downVoteButton = $('.down-vote');
var $ideaContainer = $('.idea-container')
var ideaTitle = $ideaTitleField.val();
var ideaBody = $ideaBodyField.val();
// var newestIdea = new CreateIdea(ideaTitle, ideaBody);

$saveButton.on('click', generateIdea);
$('section').on('click', '.delete-icon', deleteIdea);
$('section').on('click', '.up-vote', increaseQuality);
$('section').on('click', '.down-vote', decreaseQuality);

$(document).ready(function() {
  // console.log(localStorage);
  for (var i = 0; i < localStorage.length; i++) {
    var storedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));

    console.log(storedIdea)
    prependIdeas(storedIdea);
  }
})

function CreateIdea(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
};

function generateIdea(e) {
  e.preventDefault();
  var ideaTitle = $ideaTitleField.val();
  var ideaBody = $ideaBodyField.val();
  var newestIdea = new CreateIdea(ideaTitle, ideaBody);
  console.log(newestIdea)
  prependIdeas(newestIdea);
  sendIdeatoStorage(newestIdea);
};

function sendIdeatoStorage(newestIdea) {
  var stringifiedIdea1 = JSON.stringify(newestIdea);
  localStorage.setItem(newestIdea.id, stringifiedIdea1);
  retrieveIdeaFromStorage(newestIdea.id);
};

function retrieveIdeaFromStorage(id) {
  var retrievedIdea = localStorage.getItem(id);
};

// CreateIdea.prototype.prependCards = function(idea) {
//   $('.idea-container').prepend(`
//     <article id="${idea.id}">
//       <button class="delete-icon"></button>
//       <h2>${idea.title}</h2>
//       <p contenteditable="true">${idea.body}</p>
//       <button class="up-vote"></button>
//       <button class="down-vote"></button>
//       <p class="rating">quality:<span class="quality">swill</span></p>
//       <hr>
//     </article>
//     `);
//   clearInputFields();
//   $ideaTitleField.focus()
// };

function prependIdeas (idea) {
  // console.log('p')
  $('.idea-container').prepend(`
    <article id="${idea.id}">
      <button class="delete-icon"></button>
      <h2>${idea.title}</h2>
      <p contenteditable="true">${idea.body}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class="rating">quality:<span class="quality">swill</span></p>
      <hr>
    </article>
    `);
  clearInputFields();
  $ideaTitleField.focus()
};

function clearInputFields() {
  $ideaTitleField.val('');
  $ideaBodyField.val('');
};

function deleteIdea() {
  $(this).closest('article').remove();
  localStorage.removeItem($(this).closest('article'));
};

function increaseQuality() {
  var $currentQuality = $(this).siblings('p').children('.quality').text();
  var newQuality = '';
    if ($currentQuality === 'swill') {
      newQuality = 'plausible';
    } else if ($currentQuality === 'plausible') {
      newQuality = 'genius';
    } else {
      return;
    };
    var currentCardId = $(this).closest('article').attr('id');
    $(this).siblings('p').children('.quality').text(newQuality);
    console.log(newQuality, currentCardId);
  };

// Re-factor decreaseQuality same as above
function decreaseQuality() {
  var $currentQuality = $(this).siblings('p').children('.quality').text();
  var newQuality = '';
  if ($currentQuality === 'genius') {
    newQuality = 'plausible';
  } else if ($currentQuality === 'plausible') {
    newQuality = 'swill';
  } else {
    return;
  };
  $(this).siblings('p').children('.quality').text(newQuality);
};


