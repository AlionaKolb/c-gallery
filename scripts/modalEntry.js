"use strict";
import { body, bodyOverlay } from "./main.js";
import { fileInput, firstModal, secondModal, modalFooter, updatePreview, postText, postHashtags, modalEntry } from "./updatePreview.js";
import { previewPostModal } from "./postPublish.js";


export function showModal() {
    fileInput.addEventListener("change", updatePreview);
    modalEntry.classList.add("active");
    firstModal.classList.remove("hidden");
    secondModal.classList.add("hidden");
    modalFooter.classList.add("hidden");
    addOverlay();
}

function addOverlay() {
    body.classList.add("with-overlay");
    bodyOverlay.classList.add("active");
}

function removeOverlay() {
    bodyOverlay.classList.remove("active");
    body.classList.remove("with-overlay");
}

export function closeAndClearEntry() {
    modalEntry.classList.remove("active");
    fileInput.value = '';
    postText.value = '';
    postHashtags.value = '';
    previewPostModal.classList.remove("active");
    removeOverlay();
}