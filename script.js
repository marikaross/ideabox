$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');
// $ideaQuality = $('.quality');
var count = 0;
// $upVoteButton = $('.up-vote');
// $downVoteButton = $('.down-vote');

$saveButton.on('click', generateIdea);
$('section').on('click', '.delete-icon', deleteIdea);
$('section').on('click', '.up-vote', increaseQuality);
$('section').on('click', '.down-vote', decreaseQuality);

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
  $('.idea-container').prepend(`
    <article>
      <button class="delete-icon"></button>
      <h2>${$ideaTitleField.val()}</h2>
      <p contenteditable="true">${$ideaBodyField.val()}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class="rating">quality:<span class="quality">swill</span></p>
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
  console.log('hi')
  console.log($(this).siblings('p').children('.quality'))
    var $quality = $('.quality')
    if ($(this).siblings('p').children('.quality').text() === 'swill') {
      $(this).siblings('p').children('.quality').text('plausible')
    } else if ($(this).siblings('p').children('.quality').text() === 'plausible') {
      $(this).siblings('p').children('.quality').text('genius')
    }
  };

function decreaseQuality() {
     var $quality = $('.quality')
    if ($quality.text() === 'genius') {
      $quality.text('plausible')
    } else if ($quality.text() === 'plausible') {
      $quality.text('swill')
    }
  };


// Downvote button: 
// If quality === 'swill' do nothing;
// else if quality === 'plausible', change text to 'swill';
// else if quality === 'genius', change text to 'plausible'
// 

