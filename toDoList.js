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
    const ul = $("<div class='listBox'><ul></ul></div>").attr('list', title);
    
    ul.css("font-size", 30);
    ul.css("font-weight", "bold");    
    ul.css("text-transform", "capitalize");
    ul.prepend(
        $(taskInput).attr('input', title)
    ).prepend(
        $(button).attr('id', title)
    );
    ul.prepend(title);
    body.append(ul)

    const spanDelete = $("<span></span>");
    spanDelete.addClass("fa");
    spanDelete.addClass("fa-times-circle");
    spanDelete.addClass("pull-right");
    $('.fa-times-circle').css( "color", "#d62828");
    spanDelete.on('click', function () {
    deleteList();
    });
    spanDelete.prependTo(ul);
}

const deleteList = (listName, taskName) => {
    taskList.remove();
}

const addNewTask = (listName, taskName) => {
    const listHtml = $("[list='"+ listName +"']");
    const taskList = listHtml.append("<li>"+ taskName +"</li>").wrapInner("<div class='new'></div>");
    listHtml.addClass("nav flex-column nav-tabs");
    
    const spanDelete = $("<span></span>");
    spanDelete.addClass("fa");
    spanDelete.addClass("fa-times-circle");
    spanDelete.addClass("pull-right");
    $('.fa-times-circle').css( "color", "#d62828");
    spanDelete.on('click', function () {
    const div = $(this).parents("taskList");
    div.remove();
    });
    spanDelete.appendTo(taskList);

    const spanEdit = $("<span></span>");
    spanEdit.addClass("fa");
    spanEdit.addClass("fa-pencil-square");
    spanEdit.addClass("pull-right");
    $('.fa-pencil-square').css( "color", "#11b5e4");
    spanEdit.on('click', function () {
    const div = $(this).parents("taskList");
    div.text(" ");
    });
    spanEdit.appendTo(taskList);

    const spanComplete = $("<span></span>");
    spanComplete.addClass("fa");
    spanComplete.addClass("fa-check-circle");
    spanComplete.addClass("pull-right");
    spanComplete.on('click', function () {
    const div = $(this).parents("taskList");
    div.css("text-decoration","line-through");
    });
    spanComplete.appendTo(taskList);
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
        } else {
           // $(lists).appendTo($("#myUL"));
        } 
        
        $("#titleValue").val("");
        const spanDelete = $("<span></span>");
        spanDelete.addClass("fa");
        spanDelete.addClass("fa-times-circle");
        spanDelete.addClass("pull-right");
        $('.fa-times-circle').css( "color", "#d62828");
        spanDelete.on('click', function () {
        deleteList();
        });
        spanDelete.appendTo(lists);

        //$('.task-list').html('<input type="text" class="form-control" id="inputValue" placeholder="Task to do..."/>');
        //$('.task-list').html('<button class="btn btn-primary pull-right" type="submit" id="addTask">Add task</button>');
        
    });
    
    
    $(document).on('click', '.addTask', function() {
        const listName = $(this).attr('id');
        const inputValue = $("[input='"+ listName +"']").val();
        console.log(inputValue);
        console.log(listName);

        addNewTask(listName, inputValue);
        
		//const li = $("<li></li>");
        //li.addClass("nav-link")
        //li.css("font-size", 30);
        //li.append($("<span>" + inputValue + "</span>"));

        if (inputValue === '') {
            alert("Please enter a task!");
        } else {
            //inputValue.appendTo($("#myUL"));
        }
    });	
});
			

