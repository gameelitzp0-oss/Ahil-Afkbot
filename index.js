const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const express = require('express');
const app = express();

// Web server taaki Render isko 24/7 chalu rakhe
app.get('/', (req, res) => {
    res.send('Super Advanced Bot is Active!');
});
app.listen(3000, () => {
    console.log('Web server running on port 3000');
});

function createBot() {
    const bot = mineflayer.createBot({
        host: 'whilewhite.aternos.me', 
        port: 48796,
        username: 'ProNinja_Masnoor', 
        version: '1.20.1'
    });

    bot.loadPlugin(pathfinder);

        bot.on('spawn', () => {
        console.log('Bot server me aa gaya hai! 😎');
        // Har 10 second me bot coordinates print karega
        setInterval(() => {
            if (bot.entity) {
                const pos = bot.entity.position;
                console.log(`Bot Coordinates -> X: ${pos.x.toFixed(1)}, Y: ${pos.y.toFixed(1)}, Z: ${pos.z.toFixed(1)}`);
            }
        }, 10000);
    });


    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!ping') {
            bot.chat('Pong!');
        }
    });

    // Automatic Rejoin Feature
    bot.on('end', () => {
        console.log('Bot disconnect ho gaya, 10 second me firse rejoin kar raha hu...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('Error aaya: ', err);
    });
}

createBot();
