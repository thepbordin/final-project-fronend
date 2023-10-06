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

export async function getPosts(roomid, sortby) {
  const posts = await fetch(`${BACKEND_URL}/posts?roomid=${roomid}&sortby=${sortby}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
  return posts;
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
