"use strict";
import { postRequest } from "./postPublish.js";

export const postText = document.querySelector("#post-text");
export const postHashtags = document.querySelector("#post-hashtags");
export const firstModal = document.querySelector(".add-post-modal__step-1");
export const secondModal = document.querySelector(".add-post-modal__step-2");
export const modalFooter = document.querySelector(".modal__footer");
export const uploadedPhoto = document.querySelector("#uploaded-photo");
export const modalEntry = document.querySelector(".add-post-modal");
export const fileInput = document.querySelector("#file-upload");

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    modalEntry.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

;
['dragenter', 'dragover'].forEach(eventName => {
    modalEntry.addEventListener(eventName, highlight, false)
});
['dragleave', 'drop'].forEach(eventName => {
    modalEntry.addEventListener(eventName, unhighlight, false)
})

function highlight() {
    modalEntry.classList.add('highlight')
}

function unhighlight() {
    modalEntry.classList.remove('highlight')
}

modalEntry.addEventListener('drop', handleDrop, false);

let files;

function handleDrop(e) {
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

export const formdata = new FormData();

export function sendPost(event) {
    event.preventDefault();
    formdata.append("image", file);
    formdata.append("tags", postHashtags.value);
    formdata.append("text", postText.value);
    postRequest();
}