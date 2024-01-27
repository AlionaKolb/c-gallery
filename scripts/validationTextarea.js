"use strict";
import { postText, postHashtags } from "./updatePreview.js";
import { textCounter } from "./postPublish.js";
import { postPublish } from "./main.js";

const MAXNUM = 2000;
const MINNUM = 0;

export function countLetters() {
    const length = postText.value.length
    textCounter.textContent = `${MINNUM + length}/${MAXNUM}`

    if (length > MAXNUM) {
        postText.style = 'border: 1px solid var(--error)';
        postPublish.style = 'background-color: var(--disabled)';
        postPublish.disabled = true;
    } else if (length <= MAXNUM) {
        postText.style = 'border: 1px solid var(--light-border)';
        postPublish.style = 'background-color: var(--primary)';
        postPublish.disabled = false;
    }
}
export function hashtagsField() {
    const regexp = /^(#([A-Za-z0-9])+\s?)+$/;
    if (regexp.test(postHashtags.value) || postHashtags.value == '') {
        postHashtags.style = 'border: 1px solid var(--light-border)';
        postPublish.style = 'background-color: var(--primary)';
        postPublish.disabled = false;
    } else {
        postHashtags.style = 'border: 1px solid var(--error)';
        postPublish.style = 'background-color: var(--disabled)';
        postPublish.disabled = true;

    }
}