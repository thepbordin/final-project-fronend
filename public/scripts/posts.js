import { getPosts} from "./api.js";

function timeAgo(mongoDBTimestamp) {
    const currentDate = new Date();
    const timestamp = new Date(mongoDBTimestamp);
    const timeDifference = currentDate - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + 'd ago';
    } else if (hours > 0) {
        return hours + 'h ago';
    } else if (minutes > 0) {
        return minutes + 'm ago';
    } else {
        return seconds + 's ago';
    }
}

function formattedTimeStamp(timestamp) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const formattedDate = new Date(timestamp).toLocaleDateString(undefined, options);
    return formattedDate 
}




export async function renderPosts(roomid, sortby="lastest") {
    const posts = await getPosts(roomid, sortby);
    const postContainer = document.querySelector(".posts");

    console.log("Redering posts from room " + roomid)
    postContainer.innerHTML = "";
    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.style.overflow = "hidden"; 
        postElement.classList.add("post");
        postElement.innerHTML = `
        <img src="./image/IMG_0923.JPG" alt="" />
        <p>${post.title}</p>
        <div class="details">
        <div class="time">
            <img src="./image/time.svg" alt="">
            <span alt="${formattedTimeStamp(post.created_at)}">${timeAgo(post.created_at)}</span>
        </div>
        <div class="scores">
            <img src="./image/Vote.svg" alt="" />
            <span>${post.score}</span>
        </div>
        </div>
        `;
        postContainer.appendChild(postElement);
    });
}