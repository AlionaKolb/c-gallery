export const photoCount = document.querySelector("#photo-count");
photoCount.value = 0;

export function countPosts() {
    photoCount.value += 1;
    photoCount.innerHTML = photoCount.value * 1;
}