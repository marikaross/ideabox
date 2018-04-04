var $ideaTitleField = $('.idea-title');
var $ideaBodyField = $('.idea-body');
var $saveButton = $('.save-button');
var $deleteButton = $('.delete');
var $ideaContainer = $('.idea-container');
var ideaTitle = $ideaTitleField.val();
var ideaBody = $ideaBodyField.val();

$saveButton.on('click', generateIdea);
$('section').on('click', '.delete-icon', deleteIdea);
$('section').on('click', '.up-vote', increaseQuality);
$('section').on('click', '.down-vote', decreaseQuality);
$('.idea-container').on('keydown blur', 'p',  saveEdits);
$('.idea-container').on('click', 'p',  allowEdits);

$(document).ready(retrieveSavedIdeas); 

function allowEdits() {
  $(this).attr('contentEditable', true);
}

function retrieveSavedIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    var storedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    prependIdeas(storedIdea);
  };
};

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


function prependIdeas (idea) {
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
  $ideaTitleField.focus();
};

function clearInputFields() {
  $ideaTitleField.val('');
  $ideaBodyField.val('');
};

function deleteIdea() {
  $(this).closest('article').remove();
  localStorage.removeItem($(this).closest('article').attr('id'));
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
};

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

function saveEdits(e) {
    var currentCard = $(this).closest('article');
  if (e.keyCode === 13) {
    sendIdeatoStorage(currentCard);
    $(this).attr('contentEditable', false);
  };
};



// Save edits to variable 
// Use key of this article to retrieve from local storage
// Parse
// Replace body using save edits variable
// Stringify
// Send back to storage





