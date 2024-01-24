"use strict";
import { closeAndClearEntry } from "./modalEntry.js";
import { showSuccessMessage, showFailMessage } from "./showMessage.js";
import { photosInfo, emptyContent, headerControls } from "./main.js";
import { formdata } from "./updatePreview.js";

export const previewPostModal = document.querySelector(".preview-post-modal");
export const textCounter = document.querySelector(".text-counter");


export const photoCount = document.querySelector("#photo-count");

const URLPOST = "https://c-gallery.polinashneider.space/api/v1/posts/";
const URLGET = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";
const MYTOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzM0MTI4LCJpYXQiOjE3MDI0OTU3MjgsImp0aSI6IjZkOWEwODNhOTk4NDQwY2Q5YzQ2ODE5N2IwODkzNWRjIiwidXNlcl9pZCI6NDN9.cf9FEPwqqPztSDdMD3RFYUtBLzpfI3jRg2zkInQWCcI";

/*let files;

export function handleDrop(e) {
    const dt = e.dataTransfer;
    files = dt.files;
    updatePreview();
}

let file;

export function updatePreview() {
    if (fileInput.files[0]) {
        file = fileInput.files[0];
    } else {
        file = files[0];
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function() {
        firstModal.classList.add("hidden");
        uploadedPhoto.src = reader.result;
        secondModal.classList.remove("hidden");
        modalFooter.classList.remove("hidden");
    })
}

const formdata = new FormData();

export function sendPost(event) {
    event.preventDefault();
    formdata.append("image", file);
    formdata.append("tags", postHashtags.value);
    formdata.append("text", postText.value);

    postRequest();
}*/

export function postRequest() {

    fetch(URLPOST, {

            method: 'POST',
            headers: {
                Authorization: MYTOKEN,
            },
            body: formdata
        })
        .then((result) => {
            if (result.ok) {
                showSuccessMessage();
                photoCount.textContent = ++photoCount.textContent;
                photosInfo.classList.remove("hidden");
                emptyContent.classList.add("hidden");
                headerControls.classList.remove("hidden");
                return result.json();
            } else {
                showFailMessage();
            };
        })
        .then(() => {})
        .catch(() => {
            showFailMessage();
        })
        .finally(() => {
            closeAndClearEntry();
        })
}