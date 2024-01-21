export const photoCount = document.querySelector("#photo-count");
photoCount.value = 0;

export function countPosts() {
    photoCount.value += 1;
    photoCount.innerHTML = photoCount.value * 1;
}

export const commentCount = document.querySelector(".statistics__comments span");
export function countComments() {
    commentCount.textContent = ++commentCount.textContent;
};