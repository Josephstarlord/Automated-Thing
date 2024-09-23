const axios = require('axios');

const fonts = {

};

module.exports.config = {
    name: 'ae',
    version: '2',
    role: 0,
    hasPrefix: false,
    aliases: ['anja'],
    description: "Command for AI-generated responses styled with special fonts.",
    usage: "ex : ai [prompt]",
    credits: 'aesther',
    cooldown: 1,
};

module.exports.run = async function({ api, event, args }) {
    const input = args.join(' ');
    
    if (!input) {
        api.sendMessage('🟡 ᗩEᔕTᕼEᖇ ⚪\n\nฅ^•ﻌ•^ฅ.🔞 .', event.threadID, event.messageID);
        api.setMessageReaction("🟡", event.messageID, () => {}, true);
        return;
    }
    
    try {
        const { data } = await axios.get(`https://api.nyxs.pw/ai/gpt4?text=${encodeURIComponent(input)}`);
        api.setMessageReaction("⭐", event.messageID, () => {}, true);
        let response = data.result || 'No response received'; // Handling empty response
        
        // Replace characters with stylized characters from fonts
        response = response.split('').map(char => {
            return fonts[char.toLowerCase()] || char; // Use lowercase for lookup to match fonts object
        }).join('');
        
        api.sendMessage(`🟡 ᗩEᔕTᕼEᖇ ⚪\n\n${response} ⚪`, event.threadID, event.messageID);
        api.setMessageReaction("🟠", event.messageID, () => {}, true);
        
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage('⚠️ Error Loading ⚠️', event.threadID, event.messageID);
        api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
};
