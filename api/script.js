// script.js
document.addEventListener("DOMContentLoaded", function() {
    redirectToRandomImage();
});

async function redirectToRandomImage() {
    try {
        let response = await fetch('../images.txt');
        let data = await response.text();
        let urls = data.split('\n').filter(url => url.trim() !== '');
        let selectedImageUrl;

        const params = new URLSearchParams(window.location.search);
        // 根据ID参数选择URL
        if (params.has('id')) {
            let id = parseInt(params.get('id'), 10);
            if (id >= 1 && id <= urls.length) {
                selectedImageUrl = urls[id - 1].trim();
            } else {
                showJsonResponse({ error: "Invalid ID provided." });
                return;
            }
        } else {
            // 默认情况：随机选择URL
            let randomIndex = Math.floor(Math.random() * urls.length);
            selectedImageUrl = urls[randomIndex].trim();
        }

        // 根据json参数决定是跳转还是显示JSON
        if (params.has('json')) {
            showJsonResponse({ imageUrl: selectedImageUrl });
        } else {
            // Use meta tag for redirection
            document.getElementById("metaRedirect").setAttribute("content", `0;url=${selectedImageUrl}`);
            // forward
            // window.location.href = selectedImageUrl;
        }

    } catch (error) {
        console.error('Error fetching or processing the image URLs:', error);
    }
}

function showJsonResponse(jsonData) {
    document.body.innerHTML = '<pre>' + JSON.stringify(jsonData, null, 2) + '</pre>';
}
