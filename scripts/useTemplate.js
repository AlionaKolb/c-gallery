const postTemplate = document.querySelector("#post-template");

export function makePostByTemplate(img, id, likes, comments) {

    const item = postTemplate.content.cloneNode(true);
    item.querySelector(".post").id = id;
    item.querySelector("img").src = img;
    item.querySelector(".likes span").innerHTML = likes;
    item.querySelector(".comments span").innerHTML = comments;

    return item;
}