"use strict";
import { closeAndClearEntry, addContent, addOverlay } from "./modalEntry.js";
import { showSuccessMessage, showFailMessage } from "./showMessage.js";
import { makePostByTemplate, makeCommentsByTemplate } from "./useTemplate.js"
import { formatDate, formatTime } from "./formatDate.js";
import { formdata, postText } from "./updatePreview.js";
export const previewPostModal = document.querySelector(".preview-post-modal");
export const textCounter = document.querySelector(".text-counter");
export const photoCount = document.querySelector("#photo-count");
export const photosContent = document.querySelector(".photos__content");
const postPhoto = document.querySelector("#post-photo");
const shareHashtads = document.querySelector(".post-hashtags a");
const infoTime = document.querySelector(".account-info__time");
const statisticsLikes = document.querySelector(".statistics__likes span");
const statisticsComments = document.querySelector(".statistics__comments span");
const btn = document.querySelector(".photos__button button");
const like = document.querySelector(".statistics__likes");
const commentsBtn = document.querySelector(".comments-button");
const delPost = document.querySelector("#delete-post");
const postComment = document.querySelector("#post-comment");
const commentsContent = document.querySelector(".comments__content");
const commentsImg = document.querySelector(".comments__add img");
const nickName = document.querySelector(".preview-post-modal span").textContent;

const URLPOST = "https://c-gallery.polinashneider.space/api/v1/posts/";
const URLGET = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";
const URLCOMMENTS = "https://c-gallery.polinashneider.space/api/v1/comments/";
const MYTOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzM0MTI4LCJpYXQiOjE3MDI0OTU3MjgsImp0aSI6IjZkOWEwODNhOTk4NDQwY2Q5YzQ2ODE5N2IwODkzNWRjIiwidXNlcl9pZCI6NDN9.cf9FEPwqqPztSDdMD3RFYUtBLzpfI3jRg2zkInQWCcI";

export function postRequest() {

    fetch(URLPOST, {

            method: 'POST',
            headers: {
                Authorization: MYTOKEN,
            },
            body: formdata
        })
        .then((result) => {
            if (result.ok) {
                showSuccessMessage();
                photoCount.textContent = ++photoCount.textContent;
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
const POSTSPORTION = 9;
let slicedData = [];
let numerOfShownItems = 9;

btn.addEventListener('click', () => {
    numerOfShownItems = Math.min(numerOfShownItems + 9, posts.length)
    slicedData = posts.slice(0, numerOfShownItems);

    const fragment = new DocumentFragment();
    photosContent.textContent = '';
    for (let item of slicedData) {
        fragment.append(makePostByTemplate(item.image, item.id));
    };
    photosContent.append(fragment);

    if (posts.length === numerOfShownItems) {
        btn.classList.add('hidden');
    }
});

export function getResponse() {
    fetch(URLGET, {
            method: 'GET',
            headers: {
                Authorization: MYTOKEN,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            posts = data;
            photosContent.textContent = '';
            photoCount.textContent = data.length;
            addContent();
            posts.sort(renderItems);

            const postsLength = data.length;
            const slicedData = data.slice(0, POSTSPORTION);
            if (postsLength > POSTSPORTION) {
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

function renderItems(a, b) {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
}

function renderComments(a, b) {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateA - dateB;
}

let currentId;
let currentPostInfo;
let dateOfCreation;

function openPreview(event) {
    if (event.target.closest(".post")) {
        const postElement = event.target.closest(".post");
        currentId = +postElement.id;
        currentPostInfo = posts.find((item) => item.id === currentId);
        const date = currentPostInfo.created_at;
        dateOfCreation = formatDate(new Date(date));
        previewPostModal.classList.add("active");
        addOverlay();
        postPhoto.src = currentPostInfo.image;
        postText.textContent = currentPostInfo.text;
        shareHashtads.textContent = currentPostInfo.tags.join(' ');
        infoTime.textContent = dateOfCreation;
        statisticsLikes.textContent = currentPostInfo.likes;
        statisticsComments.textContent = currentPostInfo.comments.length;
        commentsContent.textContent = currentPostInfo.comments;
        currentPostInfo.comments.sort(renderComments);
        addComment();
        commentsBtn.addEventListener('click', commentResponse);
        postComment.addEventListener('keyup', keycheck);
    } else {
        like.classList.remove("liked");
        postComment.value = '';
    }
}

function keycheck(e) {
    if (e.keyCode == 13) {
        commentResponse();
    }
};

function addComment() {
    commentsContent.textContent = '';
    const fragment = new DocumentFragment();

    for (let item of currentPostInfo.comments) {
        let itemTime = formatTime(new Date(item.created_at));
        fragment.append(makeCommentsByTemplate(commentsImg.src, nickName, item.text, itemTime));
    };
    commentsContent.append(fragment);
}

export function deleteResponse() {

    fetch(`${URLPOST}${currentId}`, {
            method: "DELETE",
            headers: {
                Authorization: MYTOKEN,
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
            photosContent.textContent = '';
            getResponse();
        })
        .catch(() => {
            showFailMessage();
        })
}

function likesResponse(event) {
    fetch(`${URLPOST}${currentId}/like/`, {

            method: 'POST',
            headers: {
                Authorization: MYTOKEN,
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

export function commentResponse() {
    if (postComment.value != '') {
        fetch(URLCOMMENTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: MYTOKEN,
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
                statisticsComments.textContent = ++statisticsComments.textContent;
                addComment();
                getResponse();
            })
            .catch(() => {
                showFailMessage();
            })
    }
}