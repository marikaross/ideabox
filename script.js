$ideaTitleField = $('.idea-title');
$ideaBodyField = $('.idea-body');
$saveButton = $('.save-button');
$deleteButton = $('.delete');


$saveButton.on('click', addIdeaToBox);
$('section').on('click', 'article .delete', deleteIdea);


function addIdeaToBox(e) {
  e.preventDefault();
  $('section').append(`
    <article>
      <h2>${$ideaTitleField.val()}</h2>
      <button class="delete icon"></button>
      <p>${$ideaBodyField.val()}</p>
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
  console.log('Delete Me!')
  $(this).closest('article').remove();
};




