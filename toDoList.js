let lists = [];
//     {
//         title: ' ',
//         tasks: [
//             { name: ' ', completed: true},
//             { name: ' ', completed: false},
//         ]
//     },
//     {
//         title: ' ',
//         tasks: [],
//     }
// ];

const taskInput = '<input type="text" class="form-control" placeholder="Task to do..."/>';
const button = '<button class="btn btn-primary addTask pull-right" type="submit">Add task</button>';

const renderLists = () => {
    const body = $("body");
    lists.forEach(list => {
        const ul = $("<div class='listBox'><ul></ul></div>").attr('list', list.title);
        ul.css("font-size", 30);
        ul.css("font-weight", "bold");    
        ul.css("text-transform", "capitalize");
        ul
        .prepend(
            $(taskInput).attr('input', list.title)
        )
        .append(
            $(button).attr('id', list.title)
        );
        list.tasks.forEach(task => {
            const li = $("<li>"+ task.name +"</li>");
            ul.append(li);
        });
        ul.prepend(list.title);
        body.append(ul)
    })
}

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
    });
    spanDelete.prependTo(ul);
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

$(document).ready(function() {
    // 1.
    renderLists();

	$('#addListTitle').on('click', function() {
        const titleValue = $("#titleValue").val();
        lists.push({ title:titleValue, tasks:[] })
        addNewList(titleValue);
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
        if (inputValue === '') {
            alert("Please enter a task!");
        } 
    });	

    $(document).on('click', '.deleteTask', function() {
        $(this).parent().remove();

    });

    $(document).on('click', '.crossedTask', function(){
        $(this).parent().css("text-decoration","line-through");
    });

});