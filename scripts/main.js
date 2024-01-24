"use strict";
import { showModal, closeAndClearEntry } from "./modalEntry.js";
import { sendPost, postText, postHashtags } from "./updatePreview.js";
import { photoCount } from "./postPublish.js";
import { countLetters, hashtagsField } from "./validationTextarea.js";


export const bodyOverlay = document.querySelector(".body-overlay");

export const addPhoto = document.querySelector("#add-photo");
export const addPost = document.querySelector("#add-first-post");
export const body = document.querySelector("body");
export const postPublish = document.querySelector("#post-publish");
export const emptyContent = document.querySelector(".empty-content");
export const photosInfo = document.querySelector(".photos__info");
export const headerControls = document.querySelector(".header__controls");

function addContent() {

    if (photoCount.value === 0) {
        emptyContent.classList.remove("hidden");
        headerControls.classList.add("hidden");
        photosInfo.classList.add("hidden");
    } else {
        emptyContent.classList.add("hidden");
    }
}

addContent();

addPhoto.addEventListener('click', showModal);
addPost.addEventListener('click', showModal);
body.addEventListener('click', function(event) {
    const target = event.target;
    if (target === bodyOverlay) {
        closeAndClearEntry();
    }
});

postPublish.addEventListener('click', sendPost);
postText.addEventListener('input', countLetters);
postHashtags.addEventListener('keyup', hashtagsField);