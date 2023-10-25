// 使用service worker
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    // 检查是否请求 /api 路径
    if (url.pathname === '/api') {
      event.respondWith(getImageResponse(url.searchParams));
    }
  });
  
  async function getImageResponse(params) {
    const response = await fetch('/images.txt');
    const data = await response.text();
    const urls = data.split('\n').filter(url => url.trim() !== '');
  
    let imageUrl;
    if (params.has('id')) {
      const id = parseInt(params.get('id'), 10);
      imageUrl = urls[id - 1];
    } else {
      const randomIndex = Math.floor(Math.random() * urls.length);
      imageUrl = urls[randomIndex];
    }
  
    if (params.has('json')) {
      const responseBody = JSON.stringify({ imageUrl: imageUrl.trim() });
      return new Response(responseBody, {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return Response.redirect(imageUrl.trim());
    }
  }
  