console.log('hello js');

$(document).ready(onReady);

function onReady() {
    console.log('hello jq');
    // perform GET request
    //getRandomQuote();
    getQuotes();
    $('#submitBtn').on('click', submitQuote)
}

function submitQuote() {
    // grabbing values from DOM
    let quote = $('#quote').val();
    let author = $('#author').val();
    console.log('clicked', quote, author);
    // send data to server via POST REQUEST
    $.ajax({
        method: 'POST',
        url: '/quotes',
        data: {
            quote: quote,
            author: author
        }
    }).then(function(response) {
        console.log('response: ', response);
        getQuotes();        
    }).catch(function(error){
        // notify user of an error
        alert(error);
    });
    
}    

// function getRandomQuote() {
//     console.log('get the quote');
    
//     $.ajax({
//         method: "GET",
//         url: '/randomQuote'
//     }).then(function (response) {
//         console.log('response', response);
//         appendToDom(response);
//     });
// }

function getQuotes() {
    console.log('get the quote');
    
    $.ajax({
        method: 'GET',
        url: '/quotes'
    }).then(function (response) {
        console.log('response', response);
        appendToDom(response);
    });
}

// dunno wtf is not working
function appendToDom(dataToAppend) {
    $('#output').empty();
    // take response from server
    // append to div with id = output
    for(let i = 0; i < dataToAppend.length; i++) {
        $('#output').append(`
        <p>"${dataToAppend[i].quote}" by ${dataToAppend[i].author}</p>
        `);
    }
}