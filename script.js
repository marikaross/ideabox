var $ideaTitleField = $('.idea-title');
var $ideaBodyField = $('.idea-body');
var $saveButton = $('.save-button');
var $deleteButton = $('.delete');
var $ideaContainer = $('.idea-container');
var $ideaTitle = $ideaTitleField.val();
var $ideaBody = $ideaBodyField.val();
var $searchField = $('.search-idea');

$saveButton.on('click', generateIdea);
$('section').on('click', '.delete-icon', deleteIdea);
$('section').on('click', '.up-vote', increaseQuality);
$('section').on('click', '.down-vote', decreaseQuality);
$('.idea-container').on('keydown blur', 'p',  saveEdits);
$('.idea-container').on('click', 'p',  allowEdits);
$('.search-idea').on('keyup',  searchIdeas);

$(document).ready(retrieveSavedIdeas); 

function allowEdits() {
  $(this).attr('contentEditable', true);
};

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
};


function prependIdeas (idea) {
  $('.idea-container').prepend(`
    <article id="${idea.id}">
    <button class="delete-icon"></button>
    <h2 class="card-title">${idea.title}</h2>
    <p contenteditable="true" class="card-body">${idea.body}</p>
    <button class="up-vote"></button>
    <button class="down-vote"></button>
    <p class="rating">quality:<span class="quality">${idea.quality}</span></p>
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
  var currentCardId = $(this).closest('article').attr('id');
  if ($currentQuality === 'swill') {
    newQuality = 'plausible';
  } else if ($currentQuality === 'plausible') {
    newQuality = 'genius';
  } else {
    return;
  };
  $(this).siblings('p').children('.quality').text(newQuality);
  var retrievedCard = JSON.parse(localStorage.getItem(currentCardId));
  retrievedCard.quality = newQuality;
  var stringifiedIdea1 = JSON.stringify(retrievedCard);
  localStorage.setItem(retrievedCard.id, stringifiedIdea1);
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
  var currentCardId = $(this).closest('article').attr('id');
  $(this).siblings('p').children('.quality').text(newQuality);
  var retrievedCard = JSON.parse(localStorage.getItem(currentCardId));
  retrievedCard.quality = newQuality;
  var stringifiedIdea1 = JSON.stringify(retrievedCard);
  localStorage.setItem(retrievedCard.id, stringifiedIdea1);
};

function saveEdits(e) {
  var currentCard = $(this).closest('article');
  if (e.keyCode === 13) {
    var editedBodyContent = $(this).closest('p').text();
    var currentCardId = $(this).closest('article').attr('id');
    var retrievedCard = JSON.parse(localStorage.getItem(currentCardId));
    retrievedCard.body = editedBodyContent;
    var stringifiedIdea1 = JSON.stringify(retrievedCard);
    localStorage.setItem(retrievedCard.id, stringifiedIdea1);
    $(this).attr('contentEditable', false);
  };
};

function searchIdeas() {
  $("article:contains('"+ $searchField.val() +"')").show();
  $("article:not(:contains('"+ $searchField.val() +"'))").hide();
};




