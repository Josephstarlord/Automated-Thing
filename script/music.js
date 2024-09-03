const axios = require("axios");

module.exports.config = {
    name: "bb",
    version: "1.0.0",
    credits: "aesther",
    description: "Interact with Llama AI",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["baby"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("[ ❗ ] - Missing question for the Sanchokuin", event.threadID, event.messageID);
        }

        const initialMessage = await new Promise((resolve, reject) => {
            api.sendMessage("Answering plss wait...", event.threadID, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            });
        });

        try {
            const response = await axios.get(`https://api.nyxs.pw/ai/gpt?text=${encodeURIComponent(q)}`);
            const answer = response.data.result;

            const formattedResponse = `🌸Sanchokuin🌸
━━━━━━━━━━━━━━━━━━
${answer}
━━━━━━━━━━━━━━━━━━`;

            await api.editMessage(formattedResponse, initialMessage.messageID);
        } catch (error) {
            console.error(error);
            await api.editMessage("An error occurred while processing your request.", initialMessage.messageID);
        }
    } catch (error) {
        console.error("Error in ai2 command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
