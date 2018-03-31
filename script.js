$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');
$ideaQuality = $('.quality');
var count = 0;
// $upVoteButton = $('.up-vote');
// $downVoteButton = $('.down-vote');

$saveButton.on('click', generateIdea);
$('section').on('click', 'article .delete-icon', deleteIdea);
$('section').on('click', 'article .up-vote', increaseQuality);
$('section').on('click', 'article .down-vote', decreaseQuality);

function CreateIdea(title, body) {
  count++;
  this.title = title;
  this.body = body;
  this.id = count;
};

function generateIdea(e) {
  e.preventDefault();
  var ideaTitle = $ideaTitleField.val();
  var ideaBody = $ideaBodyField.val();
  var newestIdea = new CreateIdea(ideaTitle, ideaBody);
  newestIdea.prependCard();
  var ideaToStore1 = {title: newestIdea.title, body: newestIdea.body, id: newestIdea.id};
  var stringifiedIdea1 = JSON.stringify(ideaToStore1);
  localStorage.setItem('savedIdea1', stringifiedIdea1)
  console.log(stringifiedIdea1)
};

CreateIdea.prototype.prependCard = function() {
  console.log('hi')
  $('section').prepend(`
    <article>
      <h2 contenteditable="true">${this.title}</h2>
      <button class="delete-icon"></button>
      <p contenteditable="true">${this.body}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class:"quality">quality: ${this.quality}</p>
      <hr>
    </article>
    `);
  clearInputFields();
  // storeIdea();
};

// function storeIdea() {
//   var ideaToStore1 = {title: newestIdea.title, body: this.body, id: this.id};
//   console.log(ideaToStore1)
// }


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
    this.quality = 'genius';
    console.log(this.quality)
    $('section').closest('.quality').text('genius')
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

