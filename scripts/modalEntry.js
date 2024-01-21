import { body, bodyOverlay } from "./main.js";
import { firstModal, secondModal, modalFooter, updatePreview, modalEntry } from "./updatePreview.js";
import { postText, postHashtags, fileInput, previewPostModal } from "./postPublish.js";
import { photoCount } from "./countPosts.js";

const emptyContent = document.querySelector(".empty-content");
const photosInfo = document.querySelector(".photos__info");
const headerControls = document.querySelector(".header__controls");

export function showModal() {
    fileInput.addEventListener("change", updatePreview);
    modalEntry.classList.add("active");
    firstModal.classList.remove("hidden");
    secondModal.classList.add("hidden");
    modalFooter.classList.add("hidden");
    addOverlay();
}

export function addContent() {
    if (photoCount.innerHTML == 0) {
        emptyContent.classList.remove("hidden");
        headerControls.classList.add("hidden");
        photosInfo.classList.add("hidden");
    } else {
        photosInfo.classList.remove("hidden");
        emptyContent.classList.add("hidden");
        headerControls.classList.remove("hidden");
    }
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