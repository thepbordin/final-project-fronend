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