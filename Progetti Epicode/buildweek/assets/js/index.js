const input = document.querySelector("#check1");
const button = document.querySelector("#bottone1");

input = addEventListener("click", () => {
    if (input.checked) {
        button.removeAttribute("disabled");
    }else{
        button.setAttribute("disabled", true);
    }
});