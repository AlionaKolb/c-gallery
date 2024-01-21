import { showModal, closeAndClearEntry } from "./modalEntry.js";
import { sendPost, postText, postHashtags } from "./postPublish.js";
import { countLetters, hashtagsField } from "./validationTextarea.js";

export const bodyOverlay = document.querySelector(".body-overlay");
export const addPhoto = document.querySelector("#add-photo");
export const addPost = document.querySelector("#add-first-post");
export const body = document.querySelector("body");
export const postPublish = document.querySelector("#post-publish");

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