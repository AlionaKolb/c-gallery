"use strict";
import { body, bodyOverlay } from "./main.js";
import { fileInput, firstModal, secondModal, modalFooter, updatePreview, postText, postHashtags, modalEntry } from "./updatePreview.js";
import { previewPostModal, photoCount } from "./postPublish.js";

const emptyContent = document.querySelector(".empty-content");
const photosInfo = document.querySelector(".photos__info");
const headerControls = document.querySelector(".header__controls");

export function showModal() {
    modalEntry.classList.add("active");
    fileInput.addEventListener("change", updatePreview);
    firstModal.classList.remove("hidden");
    secondModal.classList.add("hidden");
    modalFooter.classList.add("hidden");
    addOverlay();
}

export function addContent() {
    if (photoCount.textContent == 0) {
        emptyContent.classList.remove("hidden");
        headerControls.classList.add("hidden");
        photosInfo.classList.add("hidden");
    } else {
        photosInfo.classList.remove("hidden");
        emptyContent.classList.add("hidden");
        headerControls.classList.remove("hidden");
    }
}

export function addOverlay() {
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