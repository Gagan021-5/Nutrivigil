const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhost:6379' // Change this for production
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log("Connected to Redis");
})();

module.exports = client;