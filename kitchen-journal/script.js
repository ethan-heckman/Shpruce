// TOGGLE RECIPE
function toggleRecipe(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === "block" ? "none" : "block";
}

// LIKE (SAVE)
function toggleLike(el, recipe) {
    el.classList.toggle("liked");

    let likes = JSON.parse(localStorage.getItem("likes")) || {};
    likes[recipe] = !likes[recipe];

    localStorage.setItem("likes", JSON.stringify(likes));
}

// LOAD LIKES
function loadLikes() {
    let likes = JSON.parse(localStorage.getItem("likes")) || {};
    document.querySelectorAll(".like").forEach(el => {
        const recipe = el.dataset.recipe;
        if (likes[recipe]) el.classList.add("liked");
    });
}

// RATING (SAVE)
function rate(el, recipe, rating) {
    let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
    ratings[recipe] = rating;

    localStorage.setItem("ratings", JSON.stringify(ratings));
    el.textContent = "⭐".repeat(rating);
}

// LOAD RATINGS
function loadRatings() {
    let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
    document.querySelectorAll(".rating").forEach(el => {
        const recipe = el.dataset.recipe;
        if (ratings[recipe]) {
            el.textContent = "⭐".repeat(ratings[recipe]);
        }
    });
}

// COMMENTS + REPLIES
function addComment(recipe) {
    const name = document.getElementById(`name-${recipe}`).value;
    const text = document.getElementById(`input-${recipe}`).value;

    if (!name || !text) return;

    let comments = JSON.parse(localStorage.getItem(recipe)) || [];
    comments.push({ name, text, replies: [] });

    localStorage.setItem(recipe, JSON.stringify(comments));
    displayComments(recipe);
}

function addReply(recipe, index) {
    const input = document.getElementById(`reply-${recipe}-${index}`);
    const text = input.value;

    let comments = JSON.parse(localStorage.getItem(recipe)) || [];
    comments[index].replies.push(text);

    localStorage.setItem(recipe, JSON.stringify(comments));
    displayComments(recipe);
}

// DISPLAY COMMENTS
function displayComments(recipe) {
    const container = document.getElementById(`comments-${recipe}`);
    container.innerHTML = "";

    let comments = JSON.parse(localStorage.getItem(recipe)) || [];

    comments.forEach((c, i) => {
        const div = document.createElement("div");
        div.classList.add("comment");

        div.innerHTML = `
            <img src="https://i.pravatar.cc/30?u=${c.name}">
            <div>
                <strong>${c.name}</strong>: ${c.text}
                ${c.replies.map(r => `<div class="reply">↳ ${r}</div>`).join("")}
                <input id="reply-${recipe}-${i}" placeholder="Reply...">
                <button onclick="addReply('${recipe}', ${i})">Reply</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// SEARCH
function searchRecipes() {
    const input = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".recipe").forEach(r => {
        const title = r.querySelector("h2").textContent.toLowerCase();
        r.style.display = title.includes(input) ? "block" : "none";
    });
}

// FILTER
function filterRecipes(type) {
    document.querySelectorAll(".recipe").forEach(r => {
        r.style.display =
            type === "all" || r.classList.contains(type)
                ? "block"
                : "none";
    });
}

// ADD RECIPE
function addRecipe() {
    const title = document.getElementById("newTitle").value;
    const category = document.getElementById("newCategory").value;

    if (!title) return;

    const section = document.createElement("section");
    section.classList.add("recipe", category);

    section.innerHTML = `
        <h2>${title}</h2>
        <div class="like" data-recipe="${title}" onclick="toggleLike(this, '${title}')">❤️</div>
        <div class="rating" data-recipe="${title}" onclick="rate(this, '${title}', 5)">⭐⭐⭐⭐⭐</div>
        <p>User submitted recipe</p>
    `;

    document.body.appendChild(section);
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// LOAD EVERYTHING
window.onload = () => {
    ["pasta", "cookie"].forEach(displayComments);
    loadLikes();
    loadRatings();
};