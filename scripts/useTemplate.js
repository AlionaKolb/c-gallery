"use strict";
const postTemplate = document.querySelector("#post-template");
export function makePostByTemplate(image, id, likes, comments) {
    const item = postTemplate.content.cloneNode(true);
    item.querySelector(".post").id = id;
    item.querySelector("img").src = image;
    item.querySelector(".likes span").textContent = likes;
    item.querySelector(".comments span").textContent = comments;

    return item;
}

const commentsTemplate = document.querySelector("#comments-template");
export function makeCommentsByTemplate(img, h3, text, time) {
    const item = commentsTemplate.content.cloneNode(true);
    item.querySelector(".comments__item-nickname").textContent = h3;
    item.querySelector("img").src = img;
    item.querySelector(".comments__item-comment").textContent = text;
    item.querySelector(".comments__item-time").textContent = time;

    return item;
}