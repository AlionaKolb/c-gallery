import { closeAndClearEntry, showModal, addContent } from "./modalEntry.js";
import { countPosts, photoCount, commentCount, countComments } from "./countPosts.js";
import { showSuccessMessage, showFailMessage } from "./showMessage.js";
import { makePostByTemplate, makeCommentsByTemplate } from "./useTemplate.js"
import { formatDate, formatTime } from "./formatDate.js";

export const fileInput = document.querySelector("#file-upload");
export const previewPostModal = document.querySelector(".preview-post-modal");
export const textCounter = document.querySelector(".text-counter");
export const postText = document.querySelector("#post-text");
export const postHashtags = document.querySelector("#post-hashtags");
export const photosContent = document.querySelector(".photos__content");
const btn = document.querySelector(".photos__button button");
const like = document.querySelector(".statistics__likes");
const commentsBtn = document.querySelector(".comments-button");
const delPost = document.querySelector("#delete-post");
let postComment = document.querySelector("#post-comment");
let commentsContent = document.querySelector(".comments__content");
let commentsImg = document.querySelector(".comments__add img");
let nickName = document.querySelector(".preview-post-modal span").innerHTML;


fileInput.setAttribute('accept', 'image/*');
fileInput.setAttribute('name', 'file');


const urlPost = "https://c-gallery.polinashneider.space/api/v1/posts/";
const urlGet = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";
const urlComments = "https://c-gallery.polinashneider.space/api/v1/comments/"; //в 3ю неделю
const myToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzM0MTI4LCJpYXQiOjE3MDI0OTU3MjgsImp0aSI6IjZkOWEwODNhOTk4NDQwY2Q5YzQ2ODE5N2IwODkzNWRjIiwidXNlcl9pZCI6NDN9.cf9FEPwqqPztSDdMD3RFYUtBLzpfI3jRg2zkInQWCcI";

let formdata = new FormData();

export function sendPost(event) {
    event.preventDefault(); // кроме drag and drop
    formdata.append("image", fileInput.files[0]); // изменить для drag and drop
    formdata.append("tags", postHashtags.value);
    formdata.append("text", postText.value);

    postRequest();
}

export function postRequest() {

    fetch(urlPost, {

            method: 'POST',
            headers: {
                Authorization: myToken,
            },
            body: formdata
        })
        .then((result) => {
            if (result.ok) {
                showSuccessMessage();
                countPosts();
                addContent();
                return result.json();
            } else {
                showFailMessage();
            };
        })
        .then(() => {
            getResponse();
        })
        .catch(() => {
            showFailMessage();
        })
        .finally(() => {
            closeAndClearEntry();
        })
}

getResponse();

let posts = [];
let postsPortion = 9;
let slicedData = [];
let numerOfShownItems = 9;

btn.addEventListener('click', () => {
    numerOfShownItems = Math.min(numerOfShownItems + 9, posts.length)
    slicedData = posts.slice(0, numerOfShownItems);
    console.log('got here', slicedData);
    const fragment = new DocumentFragment();
    photosContent.innerHTML = '';
    for (let item of slicedData) {
        fragment.append(makePostByTemplate(item.image, item.id));
    };
    photosContent.append(fragment);
    if (posts.length === numerOfShownItems) {
        btn.classList.add('hidden');
    }
});

export function getResponse() {
    fetch(urlGet, {
            method: 'GET',
            headers: {
                Authorization: myToken,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            photosContent.innerHTML = '';
            posts = data;

            photoCount.innerHTML = data.length;
            addContent();

            const postsLength = data.length;
            const slicedData = data.slice(0, postsPortion);

            if (postsLength > postsPortion) {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden')
            }

            const fragment = new DocumentFragment();
            for (let item of slicedData) {
                fragment.append(makePostByTemplate(item.image, item.id, item.likes, item.comments.length));
            };
            photosContent.append(fragment);
        })
        .then(() => {
            window.addEventListener('click', openPreview);
            delPost.addEventListener('click', deleteResponse);
            like.addEventListener('click', likesResponse);
        })
}

let currentId;
let currentPostInfo;

function openPreview(event) {

    if (event.target.closest(".post")) {

        const postElement = event.target.closest(".post");
        currentId = +postElement.id;
        currentPostInfo = posts.find((item) => item.id === currentId);

        let date = currentPostInfo.created_at;
        const dateOfCreation = formatDate(new Date(date));
        console.log(currentPostInfo.id);
        previewPostModal.classList.add("active");
        showModal();
        document.querySelector("#post-photo").src = currentPostInfo.image;
        document.querySelector(".post-text").innerHTML = currentPostInfo.text;
        document.querySelector(".post-hashtags a").innerHTML = currentPostInfo.tags.join(' ');
        document.querySelector(".account-info__time").innerHTML = dateOfCreation;
        document.querySelector(".statistics__likes span").innerHTML = currentPostInfo.likes;
        commentCount.innerHTML = currentPostInfo.comments.length;
        commentsContent.innerHTML = currentPostInfo.comments; //разобраться
        addComment();

        commentsBtn.addEventListener('click', commentResponse);
    } else {
        like.classList.remove("liked");
        postComment.value = '';
    }
}

function addComment() {
    commentsContent.innerHTML = '';
    const fragment = new DocumentFragment();

    for (let item of currentPostInfo.comments) {
        let itemTime = formatTime(new Date(item.created_at));
        fragment.append(makeCommentsByTemplate(commentsImg.src, nickName, item.text, itemTime));
    };
    commentsContent.append(fragment);
}

export function deleteResponse() {

    fetch(urlPost + `${currentId}`, {
            method: "DELETE",
            headers: {
                Authorization: myToken,
            },
        })
        .then((a) => {
            if (a.ok) {
                showSuccessMessage();
            } else {
                showFailMessage();
            };
            closeAndClearEntry();
        })
        .then(() => {
            photosContent.innerHTML = '';
            getResponse();
        })
        .catch(() => {
            showFailMessage();
        })
}

function likesResponse(event) {
    fetch(urlPost + `${currentId}/like/`, {

            method: 'POST',
            headers: {
                Authorization: myToken,
            },
        })
        .then(() => {
            if (event.target.classList.contains("fa-heart")) {

                const quantityLikes = event.target.closest(".statistics__likes").querySelector("span");
                like.classList.add("liked");
                quantityLikes.textContent = ++quantityLikes.textContent;
            }
            getResponse();
        })
}

export function commentResponse(event) {
    event.preventDefault();

    if (postComment.value != '') {
        fetch(urlComments, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: myToken,
                },
                body: JSON.stringify({
                    text: postComment.value,
                    post: `${currentId}`,
                }),
            })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                postComment.value = '';
                currentPostInfo.comments.push(data);
            })
            .then(() => {
                commentsContent.innerHTML = '';
                addComment();
                countComments();
                getResponse();
            })
            .catch(() => {
                showFailMessage();
            })
    }
}