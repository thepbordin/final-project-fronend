import { renderRooms } from "./rooms.js";
import { renderPosts } from "./posts.js";



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready");
    renderRooms();
   
});

const sortSelect = document.querySelector("#sort-select");
sortSelect.addEventListener("change", () => {
    const roomid = document.querySelector(".add_button").getAttribute("roomid");
    renderPosts(roomid, sortSelect.value);
});

var addPage = true;
const addPostButton = document.querySelector(".add_button");
addPostButton.addEventListener("click", () => {
    const postForm = document.querySelector(".post-form");
    const roomList = document.querySelector(".subject-scroll");
    const roomTitle = document.querySelector("#form-title");
    if(addPage) {
        postForm.style.display = "block";
        roomList.style.display = "none";
        roomTitle.innerHTML = "Share you note!";
    }else{
        postForm.style.display = "none";
        roomList.style.display = "block";
        roomTitle.innerHTML = "Select Room";
    }

    addPage = (addPage ? false : true);
    
});