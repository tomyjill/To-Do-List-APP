// let lists = [
//     {
//         title: 'test',
//         tasks: [
//             { name: 'gfgfd', completed: true},
//             { name: 'yhtrf', completed: false},
//         ]
//     },
//     {
//         title: 'tes2',
//         tasks: [],
//     }
// ];


const taskInput = '<input type="text" class="form-control" placeholder="Task to do..."/>';
const button = '<button class="btn btn-primary addTask pull-right" type="submit">Add task</button>';
                        // string
const addListToStorage = (listTitle) => {
    const newList = {
        title: listTitle,
        tasks: [],
    }
          // array
    const storedLists = JSON.parse(localStorage.getItem('list')) || [];
    storedLists.push(newList);
    localStorage.setItem('list', JSON.stringify(storedLists)); 
}

// const addTaskToStorage

const addNewList = (title) => {
    const body = $("body");
    console.log('taskInput')
    const ul = $("<div class='listBox'><ul></ul></div>").attr('list', title);
    
    ul.css("font-size", 30);
    ul.css("font-weight", "bold");    
    ul.css("text-transform", "capitalize");
    ul.prepend(taskInput).prepend(button);
    ul.prepend(title);
    body.append(ul)

    const spanDelete = $("<span></span>");
    spanDelete.addClass("fa");
    spanDelete.addClass("fa-times-circle");
    spanDelete.addClass("pull-right");
    $('.fa-times-circle').css( "color", "#d62828");
    spanDelete.on('click', function () {
        ul.remove();
        deleteStorageList(title);
    });
    spanDelete.prependTo(ul);
}

const renderLists = () => {
    const lists = JSON.parse(localStorage.getItem('list')) || [];
    lists.forEach(list => {
        addNewList(list.title);
    });
}

const addNewTask = (listName, taskName) => {
    const listHtml = $("[list='"+ listName +"']");
    const li = $('<li>');
    li.text(taskName);
    const deleteSpan = 
    $("<span class='deleteTask' task=" + taskName + "></span>");
    deleteSpan.addClass("fa");
    deleteSpan.addClass("fa-times-circle");
    deleteSpan.addClass("pull-right");
    $('.fa-times-circle').css( "color", "#d62828");
    li.append(deleteSpan);
    li.attr('taskName', taskName);
    listHtml.append(li);
    
    const completeSpan = 
    $("<span class='crossedTask' task=" + taskName +"></span>");
    completeSpan.addClass("fa");
    completeSpan.addClass("fa-check-circle");
    completeSpan.addClass("pull-right");
    li.append(completeSpan);
    listHtml.append(li);
}

const deleteStorageList = (listTitle) => {

    const storedLists = JSON.parse(localStorage.getItem('list')) || [];
    const cleanLists = storedLists.filter(list => list.title !== listTitle);
    localStorage.setItem('list', JSON.stringify(cleanLists)); 
}

$(document).ready(function() {

    // 1.
    renderLists();
    //$('.listBox').html(localStorage.getItem('listBox'));
	$('#addListTitle').on('click', function() {
        const titleValue = $("#titleValue").val();
        // lists.push({ title:titleValue, tasks:[] })
        addNewList(titleValue);
        addListToStorage(titleValue);
        console.log("titleValue");
        
        if (titleValue === '') {
            alert("Please enter a list title!");
        } 
        //localStorage.setItem('listBox', $('.listBox').html());
    });
        
    $(document).on('click', '.addTask', function() {
        const listName = $(this).parent().attr('list');
        const inputValue = $(this).next('input').val();
        console.log(inputValue);
        console.log(listName);

        addNewTask(listName, inputValue);

        // create new function addTaskToStorage
        // this function will accept listName and Task Name
        // you will need to find that list in the sotrage
        // and add added task to that list tasks array in proper format
        //  { name: 'some task', completed: false },

        if (inputValue === '') {
            alert("Please enter a task!");
        } 
        //localStorage.setItem('listBox', $('.listBox').html());
    });	

    $(document).on('click', '.deleteTask', function() {
        $(this).parent().remove();
    });

    $(document).on('click', '.crossedTask', function(){
        $(this).parent().css("text-decoration","line-through");
        //localStorage.setItem('listBox', $('.listBox').html());
    });
});