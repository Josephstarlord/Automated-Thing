const axios = require('axios');

module.exports.config = {
    name: 'ae',
    version: '1.0.0',
    credits: 'aesther',
    description: 'Interact with Llama AI',
    hasPrefix: false,
    cooldown: 5,
    aliases: ['llama'],
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(' ');
        if (!q) {
            return api.sendMessage("[ ‼️ ] - Missing question for the ae\n\nฅ^•ﻌ•^ฅ ", event.threadID, event.messageID);
        }

        const initialMessage = await new Promise((resolve, reject) => {
            api.sendMessage("[⚪🔵🔴....]", event.threadID, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            });
        });

        try {
            const response = await axios.get(`https://deku-rest-api.gleeze.com/new/gpt-3_5-turbo?prompt=${encodeURIComponent(q)}`);
            const answer = response.data.result.reply;

            const formattedResponse = `[💬] ᗩᗴ :\n\n${answer}\n\n⚪🔵🔴`;

            await new Promise((resolve, reject) => {
                api.editMessage(formattedResponse, initialMessage.messageID, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        } catch (error) {
            console.error(error);
            await new Promise((resolve, reject) => {
                api.editMessage("An error occurred while processing your request.", initialMessage.messageID, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }
    } catch (error) {
        console.error('Error in ae command:', error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
