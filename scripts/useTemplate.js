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