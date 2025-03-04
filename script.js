const formNode = document.querySelector("#eventRegistrationForm");

formNode.addEventListener("submit", eventObject => {
    eventObject.preventDefault();
    
    const isValid = validateForm();

    if (isValid) {
        formNode.submit();
    }
});

function validateForm() {
    let isValid = true;

    const errorMessageNodes = document.querySelectorAll(".error-message");
    errorMessageNodes.forEach(e => {
        e.remove();
    });
    const userNameInputNode = document.querySelector("#user_name");
    const userNameValue = escapeHTML(userNameInputNode.value.trim());
    if (userNameValue.includes(" ")) {
        isValid = false;
        showInputError(userNameInputNode, "Usernames cannot include spaces");
    }
    if (userNameValue.length < 4) {
        isValid = false;
        showInputError(userNameInputNode, "Usernames must be at least 4 characters in length");
    }

    const emailInputNode = document.querySelector("#field_email");
    const emailInputValue = escapeHTML(emailInputNode.value.trim());
    
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(emailInputValue)) {
        isValid = false;
        showInputError(emailInputNode, "Please enter a valid email address.");
    }

    const passwordInputNode = document.querySelector("#password");
    const passwordValue = passwordInputNode.value.trim();
    if (passwordValue.length < 6) {
        isValid = false;
        showInputError(passwordInputNode, "Password must be at least 6 characters long.");
    }

    return isValid;
}

function showInputError(inputElement, message) {
    const errorText = document.createElement("div");
    errorText.innerText = message;
    errorText.classList.add("error-message");
    errorText.setAttribute("role", "alert");
    inputElement.insertAdjacentElement("afterend", errorText);
}

function escapeHTML(input) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
