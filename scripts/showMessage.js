import { body } from "./main.js";

let clon;
export function showSuccessMessage() {
    const successMessage = document.querySelector("#alert-success");
    clon = successMessage.content.firstElementChild.cloneNode(true);

    body.appendChild(clon);

    setTimeout(() => {
        clon.remove();
    }, 2000);
}

export function showFailMessage() {
    const failMessage = document.querySelector("#alert-fail");
    clon = failMessage.content.firstElementChild.cloneNode(true);
    body.appendChild(clon);

    setTimeout(() => {
        clon.remove();
    }, 2000);
}