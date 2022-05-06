function page_load() {
    document.cookie = "question_counter = 0; answers = []; "
}

function option_0_button_click() {
    console.log("clicked 0");
}

function option_1_button_click() {
    console.log("clicked 1");
    test();
}