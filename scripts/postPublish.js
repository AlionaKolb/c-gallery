import { closeAndClearEntry } from "./modalEntry.js";
import { countPosts } from "./countPosts.js";
import { showSuccessMessage, showFailMessage } from "./showMessage.js";
import { photosInfo, emptyContent, headerControls } from "./main.js";

export const fileInput = document.querySelector("#file-upload");
export const previewPostModal = document.querySelector(".preview-post-modal");
export const textCounter = document.querySelector(".text-counter");
export const postText = document.querySelector("#post-text");
export const postHashtags = document.querySelector("#post-hashtags");

fileInput.setAttribute('accept', 'image/*');
fileInput.setAttribute('name', 'file');


const urlPost = "https://c-gallery.polinashneider.space/api/v1/posts/";
const urlGet = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";
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
                photosInfo.classList.remove("hidden");
                emptyContent.classList.add("hidden");
                headerControls.classList.remove("hidden");
                return result.json();
            } else {
                showFailMessage();
            };
        })
        .then(() => {
            //getResponse();
        })
        .catch(() => {
            showFailMessage();
        })
        .finally(() => {
            closeAndClearEntry();
        })
}