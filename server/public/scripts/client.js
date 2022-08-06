console.log('in client.js')

$(document).ready(function (){
    console.log('JQ');
    //click listeners
    getClickListeners();
    //load existing to to items at page load
    getTodo();

});//end doc ready

function getTodo(){
    console.log('in getTodo');
}

function getClickListeners(){
    console.log('in getClickListeners');
}