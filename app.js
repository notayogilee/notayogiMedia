import client from "./client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

const createImageUrl = (source) => {
  return builder.image(source);
};

const getAllPosts = async () => {
  const query = '*[_type == "post"]';
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Query failed: ", error);
  }
};

const posts = await getAllPosts();

const postSection = document.getElementById("postSection");

posts.forEach(({ title, subtitle, image }) => {
  const imageUrl = createImageUrl(image).url();
  const postElement = `<div>
                        <h1>${title}</h1>
                        <h2>${subtitle}</h2>
                        <img class='post-img' src=${imageUrl} alt=${title} />
                      </div>`;
  postSection.insertAdjacentHTML("beforeend", postElement);
});

console.log(posts);
