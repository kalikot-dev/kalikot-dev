document.getElementById("homeButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("addMediaButton").addEventListener("click", function() {
    document.getElementById("mediaOptions").style.display = "block";
});

document.getElementById("photoOption").addEventListener("click", function() {
    document.getElementById("fileInput").accept = "image/*";
    document.getElementById("fileInput").click();
});

document.getElementById("videoOption").addEventListener("click", function() {
    document.getElementById("fileInput").accept = "video/*";
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function() {
    document.getElementById("titleInput").style.display = "block";
});

document.getElementById("titleInput").addEventListener("input", function() {
    document.getElementById("shareButton").style.display = "block";
    document.getElementById("shareButton").disabled = !this.value.trim();
});

document.getElementById("shareButton").addEventListener("click", function() {
    const file = document.getElementById("fileInput").files[0];
    const title = document.getElementById("titleInput").value.trim();

    if (file && title) {
        const blogContent = document.getElementById("blogContent");

        const mediaElement = file.type.startsWith("image/") ?
            `<img src="${URL.createObjectURL(file)}" alt="${title}">` :
            `<video controls src="${URL.createObjectURL(file)}"></video>`;

        blogContent.innerHTML += `
            <div class="blogPost">
                <h2>${title}</h2>
                ${mediaElement}
                <div>
                    <button class="likeButton"><i class="fas fa-thumbs-up"></i> Like</button>
                    <span class="likeCount">0 likes</span>
                    <span class="commentCount">0 comments</span>
                </div>
                <input type="text" class="commentInput" placeholder="Add a comment">
                <div class="comments"></div>
            </div>
        `;

        const likeButton = blogContent.querySelector(".blogPost:last-child .likeButton");
        const likeCount = blogContent.querySelector(".blogPost:last-child .likeCount");
        const commentCount = blogContent.querySelector(".blogPost:last-child .commentCount");
        const commentInput = blogContent.querySelector(".blogPost:last-child .commentInput");
        const comments = blogContent.querySelector(".blogPost:last-child .comments");

        let likes = 0;
        let commentsCount = 0;

        likeButton.addEventListener("click", function() {
            likes += 1;
            likeCount.textContent = `${likes} ${likes === 1 ? 'like' : 'likes'}`;
        });

        commentInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter" && this.value.trim()) {
                const comment = document.createElement("p");
                comment.textContent = this.value.trim();
                comments.appendChild(comment);
                this.value = "";
                commentsCount += 1;
                commentCount.textContent = `${commentsCount} ${commentsCount === 1 ? 'comment' : 'comments'}`;
            }
        });

        // Reset form
        document.getElementById("fileInput").value = "";
        document.getElementById("titleInput").value = "";
        document.getElementById("titleInput").style.display = "none";
        document.getElementById("shareButton").style.display = "none";
        document.getElementById("mediaOptions").style.display = "none";
    }
});