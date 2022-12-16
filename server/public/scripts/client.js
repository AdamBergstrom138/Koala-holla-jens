console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()

  // load existing koalas on page load
  getKoalas();
  // delete
  $('body').on('click', '.deleteButton', deleteKoala);
  $('body').on('click', '.transferButton', transferKoala);

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    let newName = $('#nameIn').val();
    let newAge = $('#ageIn').val();
    let newGender = $('#genderIn').val();
    let newReadyForTransfer = $('#readyForTransferIn').val();
    let newNotes = $('#notesIn').val();
    // using a test object
    let koalaToSend = {
      name: newName,
      age: newAge,
      gender: newGender,
      readyForTransfer: newReadyForTransfer,
      notes: newNotes,
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
     type: 'GET',
     url: '/koalas'
    }).then(function(response) {
      $('#viewKoalas').empty();
      console.log(response);
      for(let koala of response){
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td class="ready${koala.id}">Ready</td>
          <td><button type="button" class="deleteButton">Delete</button></td>
        </tr>
        `);
        if (koala.ready_to_transfer === 'N'){
          $(`.ready${koala.id}`).empty();
          $(`.ready${koala.id}`).append('<td><button type="button" class="transferButton">Ready</button></td>');
        }
      }
    }).catch(function(error){
      console.log('error in GET', error);
    });
} // end getKoalas
function transferKoala(){
  console.log('in transferKoala');
  let idToUpdate = $(this).parent().parent().parent().data().id;
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: 'Y'
    }
  }).then((response) => {
    getKoalas();
  }).catch((error) => {
    console.log('something broke in transferKoala():', error);
  })
}


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then((response) => {
    getKoalas();
  }).catch((error) => {
    console.log('something broke in saveKoala():', error);
  })
}

function deleteKoala() {
  let idToDelete = $(this).parent().parent().data().id;
  console.log(idToDelete);
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then((response) => {
    getKoalas();
  }).catch((error) => {
    console.log('deleteKoala() sure broke:', error);
  })
}

