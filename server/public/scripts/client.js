console.log('in client.js')

//DOC READY
$(document).ready(function (){
    console.log('JQ');
    //click listeners
    getClickListeners();
    //load existing to do items at page load
    getTodo();

})//end doc ready


//GET
function getTodo(){
    console.log('in getTodo');
    //ajax call to server to get todo list
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function (response){
    //console.log(response)
    renderTodo(response);
    }).catch(function(err){
        console.log(err);
        alert('error in get to do')
    })
} //end GET

//POST
function saveTask(taskToAdd) {
    console.log('in saveTask');

    //ajax call to get tasks
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: taskToAdd
    // }).then(function(response){
    //     //console.log(response);
    //     getTodo()
    // }).catch(function(err){
    //     console.log('error in post', err);
    //     alert ('unable to add task')
    // })
    }).then(function (response){
        getTodo()
    }).catch(function(err){
        console.log('error in post', err)
        alert ('unable to add task')
    })
   
}//end POST

//render to DOM
function renderTodo(todoArray){
    console.log('client post')
    $('#viewTodo').empty();
    
    for (let i=0; i < todoArray.length; i++){
        if (todoArray[i].is_done===false){
            console.log('in false')
            $('#viewTodo').append(`
            <tr data-id=${todoArray[i].id}>
                <td>${todoArray[i].task}</td>
                <td>${todoArray[i].is_done}</td>
                <td><button class="completeBtn">COMPLETED</button></td>
                <td><button id="deleteBtn">DELETE</td>
            </tr>    
            `)
        } else {
            console.log('in true', todoArray[i])
            $('#viewTodo').append(`
            <tr data-id=${todoArray[i].id}>
                <td>${todoArray[i].task}</td>
                <td>${todoArray[i].is_done}</td>
                <td><button id="deleteBtn">DELETE</td>
            </tr>
            `) }   
        }
    } //end render to DOM

//PUT
function completeTask(){
    console.log('in updateTask');

    const id = $(this).closest('tr').data('id');
    console.log(id);

    $.ajax({
        method: "PUT",
        url: `/todo/${id}`,
        data:{
            is_done: false
        }
    }).then(function (response){
        getTodo()
    }).catch(function (err){
        console.log(err)
        alert ('mark complete failed')
    })
}//end PUT

//DELETE
function deleteTask(){
    console.log('in deleteTask')
    //ajax call to server to delete tasks
    const id = $(this).closest('tr').data('id');
    console.log(id);
    $.ajax({
        method: "DELETE",
        url: `/todo/${id}`
    }).then(function(response){
        //console.log('response',response)
        getTodo();
    }).catch(function(err) {
        console.log(err);
        alert('error in delete', err)
    })
} // end DELETE

//Get Click Listeners

function getClickListeners(){
    console.log('in getClickListeners');
    $('#addBtn').on('click',function (){
        console.log('click addBtn');
    
        let taskToAdd = {
            task: $('#todoIn').val(),
            is_done: false
        }    
        saveTask(taskToAdd);
        getTodo();
    
    })

    //call saveTask with new object
     
     
     $('#viewTodo').on('click', '#deleteBtn', deleteTask);
     $('#viewTodo').on('click', '.completeBtn', completeTask);

}//end Get Click Listeners