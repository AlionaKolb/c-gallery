const postTemplate = document.querySelector("#post-template");
export function makePostByTemplate(img, id, likes, comments) {

    const item = postTemplate.content.cloneNode(true);
    item.querySelector(".post").id = id;
    item.querySelector("img").src = img;
    item.querySelector(".likes span").innerHTML = likes;
    item.querySelector(".comments span").innerHTML = comments;

    return item;
}

const commentsTemplate = document.querySelector("#comments-template");
export function makeCommentsByTemplate(img, h3, text, time) {

    const item = commentsTemplate.content.cloneNode(true);
    item.querySelector(".comments__item-nickname").innerHTML = h3;
    item.querySelector("img").src = img;
    item.querySelector(".comments__item-comment").innerHTML = text;
    item.querySelector(".comments__item-time").innerHTML = time;

    return item;
}