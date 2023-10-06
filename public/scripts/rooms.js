import { getRooms } from "./api.js";
import { renderPosts } from "./posts.js";

function changeRoom(id, name){
    const addBtn = document.querySelector(".add_button");
    const roomName = document.querySelector("#room-name");
    const sortby = document.querySelector("#sort-select").value;
    roomName.innerHTML = name;
    addBtn.setAttribute("roomid", id)
    renderPosts(id, sortby);

}
export async function renderRooms() {
    const rooms = await getRooms();
    const subjectContainer = document.querySelector(".subject-scroll");
    subjectContainer.innerHTML = "";
    rooms.forEach((room) => {
        const subjectElement = document.createElement("div");
        subjectElement.addEventListener("click", () => {
            changeRoom(room._id, room.title);
        });
        subjectElement.classList.add("subject");
        subjectElement.innerHTML = `
        <img
        class="subject-image"
        src="./image/logo.png"
        alt=""
      />
      <span>${room.title}</span>
        `;
        subjectContainer.appendChild(subjectElement);
    });
}
