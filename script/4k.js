const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "4k",
    version: "1.0.0",
    role: 0,
    credits: "aesther",
    description: "Enhance an image",
    hasPrefix: false,
    aliases: ["enhanceImage", "remini"],
    usage: "[4k]",
    cooldown: 5
};

module.exports.run = async function({ api, event }) {
    try {
        if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
            return api.sendMessage("‼️‼️ | Reply with a 𝗣𝗜𝗖𝗧𝗨𝗥𝗘 or provide a 𝗨𝗥𝗟.\n\nThen type 4𝗞 or 𝗥𝗘𝗠𝗜𝗡𝗜", event.threadID);
        }

        const attachment = event.messageReply.attachments[0];

        // Check if the attachment is a photo
        if (attachment.type !== 'photo') {
            return api.sendMessage("‼️‼️ | Reply with a 𝗣𝗜𝗖𝗧𝗨𝗥𝗘 or provide a 𝗨𝗥𝗟.\n\nThen type 4𝗞 or 𝗥𝗘𝗠𝗜𝗡𝗜.", event.threadID);
        }

        const imageUrl = attachment.url;
        const apiUrl = `https://api.sanzy.co/api/upscale-image?imageUrl=${encodeURIComponent(imageUrl)}`;

        api.sendMessage("🕟 | 𝙐𝙋𝙎𝘾𝘼𝙇𝙀 𒊹︎︎︎𒊹︎︎︎𒊹︎︎︎", event.threadID);

        // Call the API to upscale the image
        const response = await axios.get(apiUrl);
        const resultUrl = response.data.data;

        // Download the enhanced image
        const enhancedImagePath = path.join(__dirname, 'enhancedImage.jpg');
        const imageResponse = await axios({
            url: resultUrl,
            responseType: 'stream'
        });
        imageResponse.data.pipe(fs.createWriteStream(enhancedImagePath));

        imageResponse.data.on('end', () => {
            // Send the enhanced image
            api.sendMessage({
                body: "🟢 | 𝙎𝙐𝘾𝘾𝙀𝙎𝙎",
                attachment: fs.createReadStream(enhancedImagePath)
            }, event.threadID, () => {
                // Delete the file after sending
                fs.unlinkSync(enhancedImagePath);
            });
        });

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
};
