$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');
// $ideaQuality = $('.quality');
// $upVoteButton = $('.up-vote');
// $downVoteButton = $('.down-vote');
var ideaTitle = $ideaTitleField.val();
var ideaBody = $ideaBodyField.val();
var newestIdea = new CreateIdea(ideaTitle, ideaBody);

$saveButton.on('click', generateIdea);
$('section').on('click', '.delete-icon', deleteIdea);
$('section').on('click', '.up-vote', increaseQuality);
$('section').on('click', '.down-vote', decreaseQuality);

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
  newestIdea.prependCard(newestIdea);
  sendIdeatoStorage(newestIdea);
};

function sendIdeatoStorage(ideaToStore1) {
  var stringifiedIdea1 = JSON.stringify(ideaToStore1);
  localStorage.setItem(ideaToStore1.id, stringifiedIdea1);
  retrieveIdeaFromStorage(ideaToStore1.id);
};


function retrieveIdeaFromStorage(id) {
  var retrievedIdea = localStorage.getItem(id);
};

CreateIdea.prototype.prependCard = function(idea) {
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
  // storeIdea();
};

function clearInputFields() {
  $ideaTitleField.val('');
  $ideaBodyField.val('');
};

function deleteIdea() {
  $(this).closest('article').remove();
};

function increaseQuality() {
  var $currentQuality = $(this).siblings('p').children('.quality').text();
  var newQuality = '';
    if ($currentQuality === 'swill') {
      newQuality = 'plausible';
    } else if ($currentQuality === 'plausible') {
      newQuality = 'genius';
    };
    var currentCardId = $(this).closest('article').attr('id');
    $(this).siblings('p').children('.quality').text(newQuality);
    console.log(newQuality);
  };


// Re-factor decreaseQuality same as above
function decreaseQuality() {
     var $quality = $('.quality')
    if ($(this).siblings('p').children('.quality').text() === 'genius') {
      $(this).siblings('p').children('.quality').text('plausible')
    } else if ($(this).siblings('p').children('.quality').text() === 'plausible') {
      $(this).siblings('p').children('.quality').text('swill')
    };
  };


