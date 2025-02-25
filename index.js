const cors_proxy = require("cors-anywhere");

const host = "0.0.0.0";
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [], // No restrictions on headers
    removeHeaders: [], // Do NOT remove cookies or any headers
    redirectSameOrigin: true, // Prevent redirect issues
    handleInitialRequest: function (req, res) {
        if (req.method === "OPTIONS") {
            res.writeHead(204, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Max-Age": "86400",
                "Access-Control-Allow-Credentials": "true", // Allow cookies
            });
            res.end();
            return true;
        }

        // **Fix URL format if it gets misconfigured**
        if (req.url.startsWith("/https:/") && !req.url.startsWith("/https://")) {
            req.url = req.url.replace("/https:/", "/https://");
        }

        return false;
    },
}).listen(port, host, function () {
    console.log(`🚀 CORS Anywhere Proxy Running on Port ${port}`);
});
