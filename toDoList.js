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

const addTaskToStorage = (listTitle, taskName) => {
    const newTask = {
        completed: false,
        name: taskName,
    };
    const storedLists = JSON.parse(localStorage.getItem('list')) || [];
    
    const updatedLists = storedLists.map(list => {
        if (list.title === listTitle) {
            list.tasks.push(newTask);
        }
        return list;
    })
    localStorage.setItem('list', JSON.stringify(updatedLists));
}

const addNewList = (title) => {
    const body = $("body");
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
        list.tasks.forEach(task => {
            addNewTask(list.title, task.name);
        })
    });
}

const addNewTask = (listTitle, taskName) => {
    const listHtml = $("[list='"+ listTitle +"']");
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

const deleteStorageTask = (listTitle, taskName) => {

    const storedLists = JSON.parse(localStorage.getItem('list')) || [];

    const updatedLists = storedLists.map(list => {
        if (list.title === listTitle) {
            const filteredTasks = list.tasks.filter(task => task.name !== taskName);
            list.tasks = filteredTasks;
        }
        return list;
    })
    localStorage.setItem('list', JSON.stringify(updatedLists)); 
}


$(document).ready(function() {

    // 1.
    renderLists();
    
	$('#addListTitle').on('click', function() {
        const titleValue = $("#titleValue").val();
        // lists.push({ title:titleValue, tasks:[] })
        addNewList(titleValue);
        addListToStorage(titleValue);
        console.log("titleValue");
        
        if (titleValue === '') {
            alert("Please enter a list title!");
        } 
    });
        
    $(document).on('click', '.addTask', function() {
        const listName = $(this).parent().attr('list');
        const inputValue = $(this).next('input').val();
        console.log(inputValue);
        console.log(listName);

        addNewTask(listName, inputValue);
        addTaskToStorage(listName, inputValue);
       
        if (inputValue === '') {
            alert("Please enter a task!");
        } 
    });	

    $(document).on('click', '.deleteTask', function() {
        $(this).parent().remove();
        const listTitle = $('.listBox').attr('list');
        const taskName = $(this).parent().attr('taskName');
        console.log(listTitle);
        console.log(taskName);
        deleteStorageTask(listTitle, taskName);
    });

    $(document).on('click', '.crossedTask', function(){
        $(this).parent().css("text-decoration","line-through");
    });
});