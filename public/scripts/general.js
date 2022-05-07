

//Controls button clicks, redirects to href value from button, after question 10 directs to result.
function button_click(id, el) {
    var retrievedObject = localStorage.getItem('localQuestionCounter');
    if(retrievedObject<10){
        var url = el.value;
        location.href = url;
    }
    else location.href = '/result.html'
    
}

//Simple log check for localQuestionCounter.
function check_count() {
    var retrievedObject = localStorage.getItem('localQuestionCounter');
    console.log("localQuestionCounter: " + retrievedObject);
}

