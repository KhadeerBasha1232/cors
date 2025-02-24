const express = require('express');
const cors = require('cors');
const cors_proxy = require('cors-anywhere');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

// Enable CORS for all requests
app.use(cors({ origin: '*' }));

// Start CORS Anywhere Proxy
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [], // Remove header requirement to avoid preflight issues
    removeHeaders: ['cookie', 'cookie2'],
    redirectSameOrigin: true, // Prevent redirect issues
    handleInitialRequest: function(req, res) {
        if (req.method === 'OPTIONS') {
            res.writeHead(204, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '86400'
            });
            res.end();
            return true;
        }
        return false;
    }
}).listen(port, host, function() {
    console.log(`CORS Anywhere running on port ${port}`);
});
