import { BACKEND_URL } from "./config.js";


// get room list
export async function getRooms() {
  const rooms = await fetch(`${BACKEND_URL}/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
  return rooms;
}
export async function createRoom(room) {
  const ret = await fetch(`${BACKEND_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),

  }).then((res) => res.json());
  return ret;
}
export async function getPosts(roomid, sortby) {
  const posts = await fetch(`${BACKEND_URL}/posts?roomid=${roomid}&sortby=${sortby}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
  return posts;
}

export async function getPostDetail(postid) {
  const posts = await fetch(`${BACKEND_URL}/posts/details?postid=${postid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
  return posts;
}
export async function getComments(postid) {
  const posts = await fetch(`${BACKEND_URL}/comment?postid=${postid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
  return posts;
}
export async function createComment(comment) {
  await fetch(`${BACKEND_URL}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
}
// { 
//   "title": "The post 3",
//   "description": "This is a sample room for testing asdsadsad.",
//   "room": "651ee0c0492f3c66494a6c0d"
// }
export async function createPost(post) {
  await fetch(`${BACKEND_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
}

export async function uploadFile(file) {
  await fetch(`${BACKEND_URL}/posts/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(file)

  }).then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}

export async function likePost(postId) {
  await fetch(`${BACKEND_URL}/posts/like/${postId}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
});
}

export async function unlikePost(postId) {
  await fetch(`${BACKEND_URL}/posts/like/${postId}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
});
}