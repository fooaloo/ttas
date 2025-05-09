addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    
    if (!targetUrl) {
        return new Response('Error: Missing URL parameter (e.g., ?url=https://example.com)', { status: 400 });
    }

    try {
        // Validate URL format
        new URL(targetUrl);
        
        // Fetch the target URL
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'GitHub-Proxy/1.0'
            }
        });
        
        // Return the response with CORS enabled
        const modifiedResponse = new Response(response.body, response);
        modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
        return modifiedResponse;
    } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
}