$(document).ready(function() {
	
	$('#addTask').on('click', function() {
		console.log("inputValue");
		const li = $("<li></li>");
        li.addClass("nav-link")
        li.css("font-size", 30);
        const inputValue = $("#inputValue").val();
        li.append($("<span>" + inputValue + "</span>"));

        if (inputValue === '') {
            alert("Please enter a task!");
        } else {
            li.appendTo($("#myUL"));
        }

        $("#inputValue").val("");
        const spanDelete = $("<span></span>");
        spanDelete.addClass("fa");
        spanDelete.addClass("fa-times-circle");
        spanDelete.addClass("pull-right");
        $('.fa-times-circle').css( "color", "#d62828");
        spanDelete.on('click', function () {
        const div = $(this).parents("li");
        div.remove();
        });
        spanDelete.appendTo(li);

        const spanEdit = $("<span></span>");
        spanEdit.addClass("fa");
        spanEdit.addClass("fa-pencil-square");
        spanEdit.addClass("pull-right");
        $('.fa-pencil-square').css( "color", "#11b5e4");
        spanEdit.on('click', function () {
        const div = $(this).parents("li");
        div.text(" ");
        });
        spanEdit.appendTo(li);

        const spanComplete = $("<span></span>");
        spanComplete.addClass("fa");
        spanComplete.addClass("fa-check-circle");
        spanComplete.addClass("pull-right");
        spanComplete.on('click', function () {
        const div = $(this).parents("li");
        div.css("text-decoration","line-through");
        });
        spanComplete.appendTo(li);
    });	
});
			

