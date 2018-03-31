$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');
$ideaQuality = $('.quality');
// $upVoteButton = $('.up-vote');
// $downVoteButton = $('.down-vote');

$saveButton.on('click', addIdeaToBox);
$('section').on('click', 'article .delete-icon', deleteIdea);
$('section').on('click', 'article .up-vote', increaseQuality);
$('section').on('click', 'article .down-vote', decreaseQuality);




function addIdeaToBox(e) {
  e.preventDefault();
  $('section').append(`
    <article>
      <h2 contenteditable="true">${$ideaTitleField.val()}</h2>
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
  console.log('Delete Me!');
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

