const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [], // Remove header requirement to avoid preflight issues
    removeHeaders: ['cookie', 'cookie2'],
    setHeaders: {
        'Access-Control-Allow-Origin': '*', // Allow any origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow common methods
        'Access-Control-Allow-Headers': '*', // Allow all headers
    }
}).listen(port, host, function() {
    console.log(`CORS Anywhere running on port ${port}`);
});
