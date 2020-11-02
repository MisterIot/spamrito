[![npm](https://img.shields.io/npm/v/whatsapp-web.js.svg)](https://www.npmjs.com/package/whatsapp-web.js) [![Depfu](https://badges.depfu.com/badges/4a65a0de96ece65fdf39e294e0c8dcba/overview.svg)](https://depfu.com/github/pedroslopez/whatsapp-web.js?project_id=9765) ![WhatsApp_Web 2.2043.8](https://img.shields.io/badge/WhatsApp_Web-2.2043.8-brightgreen.svg) [![Discord Chat](https://img.shields.io/discord/698610475432411196.svg?logo=discord)](https://discord.gg/H7DqQs4)  

# whatsapp-web.js
A WhatsApp API client that connects through the WhatsApp Web browser app

It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

**NOTE:** I can't guarantee you will not be blocked by using this method, although it has worked for me. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## Installation

The module is now available on npm! `npm i whatsapp-web.js`

Please note that Node v10.18.1+ is required due to Puppeteer.

## Example usage

```js
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
```
