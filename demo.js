const PROXY_URL = "http://localhost:8080/https://yupmovie.me/shangri-la-frontier/";
const TOTAL_REQUESTS = 100; // Adjust based on test size
const CONCURRENT_REQUESTS = 10; // Number of parallel requests at a time
let requestCount = 0;
let rateLimitCount = 0;

async function sendRequest(requestNumber) {
    try {
        const response = await fetch(PROXY_URL);
        console.log(`Request #${requestNumber}: Status ${response.status}`);

        if (response.status === 429) {
            console.warn(`⚠️ Rate limit hit on request #${requestNumber}`);
            rateLimitCount++;
        } else {
            requestCount++;
        }
    } catch (error) {
        console.error(`Error on request #${requestNumber}:`, error.message);
    }
}

async function testRateLimit() {
    let promises = [];

    for (let i = 1; i <= TOTAL_REQUESTS; i++) {
        promises.push(sendRequest(i));

        if (i % CONCURRENT_REQUESTS === 0) {
            await Promise.all(promises); // Wait for batch to complete
            promises = []; // Reset batch
        }
    }

    await Promise.all(promises); // Process remaining requests
    console.log(`✅ Total successful requests: ${requestCount}`);
    console.log(`⛔️ Total rate-limited requests (429): ${rateLimitCount}`);
}

testRateLimit();
