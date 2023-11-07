addEventListener("fetch", (event) => {
    event.respondWith(rewriteURL(event.request))
})

async function rewriteURL(request) {
    let url = new URL(request.url)
    let newURL = `${url.hostname}${url.pathname}`
    let subRequest = new Request(request)
    const regex = /^.*(\/test2\/)$/

    // URL rewrite
    if (url.pathname.match(regex)) {
    origin_host = "navidrome.erfianugrah.com"
    url.pathname = url.pathname.replace(regex, "test3")
    // url.pathname = "/test3"
    url.host = origin_host

    // Request Headers Modification
    subRequest.headers.set("test", "test")

    let newResponse = await fetch(subRequest, {
        cf: { resolveOverride: origin_host },
    })

    // Response Headers Modification
    response = new Response(newResponse.body, newResponse)
    response.headers.set("CF-Forward-Origin-Host", url.host)
    response.headers.set("Cache-Control", "no-store")
    return response
    }
    return await fetch(request)
}