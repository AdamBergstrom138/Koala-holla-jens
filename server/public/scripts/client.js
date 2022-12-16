console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
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
      // empty then build
      console.log(response);
      for(let koala of response){
        $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td>''</td>
          <td>''</td>
        </tr>
        `);
      }
    }).catch(function(error){
      console.log('error in GET', error);
    });
} // end getKoalas

// $.ajax({
//   type: 'GET',
//   url: '/books'
// }).then(function(response) {
//   // Then, render the books!
//   $('#bookShelf').empty();

//   for (let book of response) {
//     $('#bookShelf').append(`
//       <tr>
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td><button data-id=${book.id} class="deleteBookButton">Delete Book</button></td>
//       </tr>
//   `);
//   }
// }).catch(function(error){
//   console.log('error in GET', error);
// });



function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
