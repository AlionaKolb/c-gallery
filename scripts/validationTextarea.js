import { textCounter, postText, postHashtags } from "./postPublish.js";
import { postPublish } from "./main.js";

const maxNum = 2000;
const minNum = 0;

export function countLetters() {
    const length = postText.value.length
    textCounter.innerHTML = `${minNum + length}/${maxNum}`

    if (length > maxNum) {
        postText.style = 'border: 1px solid var(--error)';
        postPublish.style = 'background-color: var(--disabled)';
        postPublish.disabled = true;
    } else if (length <= maxNum) {
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