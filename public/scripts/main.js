import { renderRooms } from "./rooms.js";
import { renderPosts, timeAgo } from "./posts.js";
import { createComment, createPost, createRoom, getComments } from "./api.js";


var joinedRooms = JSON.parse(localStorage.getItem("joinedRooms")) || [];
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready");
    renderRooms(joinedRooms);
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
    const addRoom = document.getElementById("add-room-btn");
    if (addPage) {
        postForm.style.display = "block";
        roomList.style.display = "none";
        roomTitle.innerHTML = "Ask a quick question!";
        addRoom.style.display = "none";

    } else {
        postForm.style.display = "none";
        roomList.style.display = "block";
        roomTitle.innerHTML = "Select Room";
        addRoom.style.display = "block";
    }

    addPage = (addPage ? false : true);

});

//  form submit call post function 
const postForm = document.querySelector("#post-form");
postForm.addEventListener("submit", async (e) => {

    e.preventDefault();
    const roomid = document.querySelector(".add_button").getAttribute("roomid");
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const postDesc = {
        title: title,
        description: description,
        room: roomid,

    };
    console.log(postDesc);
    await createPost(postDesc);
    renderPosts(roomid, sortSelect.value);
    postForm.reset();
});


const addRoomBtn = document.querySelector("#add-room-btn");
addRoomBtn.addEventListener("click", async () => {
    // prompt for roomid
    const shareId = prompt("Enter room id");
    if (shareId) {
        joinedRooms.push(shareId);
        localStorage.setItem("joinedRooms", JSON.stringify(joinedRooms));
        renderRooms(joinedRooms);

    }
})


// unhide modal 
export async function openModal(details) {

    const modal = document.querySelector(".modal");
    modal.style.display = "block";
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.querySelector(".modal-desc");
    const modalClose = document.querySelector(".close-m");
    const comments = document.querySelector(".comments-container");
    modalTitle.innerHTML = details.title;
    modalDesc.innerHTML = details.description;

    var ListComment = await getComments(details._id);
    console.log(ListComment)
    comments.innerHTML = "";
    updateComments(ListComment)
    const commentForm = document.querySelector("#comment-form");
    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const commentText = document.getElementById("comment-text").value;
        const payload = { text: commentText, post: details._id };
        createComment(payload);
        const updatedComments = [...ListComment, payload];
        commentForm.reset();
        updateComments(updatedComments)

    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";

    })

    function updateComments(updatedComments) {
        comments.innerHTML = "";
        updatedComments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
            <div class="comment-header">
                <img src="./image/Avatar.png" alt="" />
                <span class="comment-author">Answer</span>
                <span class="comment-time">${timeAgo(comment.created_at)}</span>
            </div>
            <div class="comment-body">
                <p>${comment.text}</p>
            </div>
            `;

            comments.appendChild(commentElement);
        });

    }

}

const createRoomBtn = document.querySelector("#create-room-btn");
createRoomBtn.addEventListener("click", async () => {
    // prompt for name
    const roomName = prompt("Enter room name");
    if (roomName) {
        const roomDesc = prompt("Enter room description");
        const room = {
            title: roomName,
            description: roomDesc,
        };
        await createRoom(room).then((data) => {
            const roomShareId = data.roomid
            console.log(roomShareId);
            joinedRooms.push(roomShareId);
            localStorage.setItem("joinedRooms", JSON.stringify(joinedRooms));
            renderRooms(joinedRooms);

        });

    }
})