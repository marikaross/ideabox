$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');
$ideaQuality = $('.quality');
// $upVoteButton = $('.up-vote');
// $downVoteButton = $('.down-vote');

var idea = {
  title: $ideaTitleField.val(),
  body: $ideaBodyField.val(),
  quality: 'swill',
}


$saveButton.on('click', generateIdeaObject);
$('section').on('click', 'article .delete-icon', deleteIdea);
$('section').on('click', 'article .up-vote', increaseQuality);
$('section').on('click', 'article .down-vote', decreaseQuality);


function CreateIdea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
};

function generateIdeaObject(e) {
e.preventDefault();
var idea1 = new CreateIdea($ideaTitleField.val(), $ideaBodyField.val());
console.log(idea1);
addIdeaToBox();
}

function addIdeaToBox (e) {
  // e.preventDefault();
  $('section').append(`
    <article>
      <h2 contenteditable="true">${this.title}</h2>
      <button class="delete-icon"></button>
      <p contenteditable="true">${$ideaBodyField.val()}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class:"quality">quality: swill</p>
      <hr>
    </article>
    `);
  clearInputFields();
};  

function clearInputFields() {
  $ideaTitleField.val('');
  $ideaBodyField.val('');
};

function deleteIdea() {
  $(this).closest('article').remove();
};

// Upvote Button:
// If quality === 'swill', then change text to 'plausible'
// Else if quality === 'plausible', then change text to 'genius'
// else if quality === 'genius' do nothing
function increaseQuality() {
    console.log($(this).closest(span.val()));
    // $ideaQuality = $('.quality');
    // $ideaQuality.text('swill');
}

function decreaseQuality() {
    console.log('down');
    console.log($(this).closest('span'));
} 

// Downvote button: 
// If quality === 'swill' do nothing;
// else if quality === 'plausible', change text to 'swill';
// else if quality === 'genius', change text to 'plausible'
// 

