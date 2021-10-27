/**
 * THIS SOFTWARE IS PROVIDED BY CLOUDFLARE "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CLOUDFLARE BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES  (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
 * USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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