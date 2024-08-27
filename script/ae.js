const axios = require('axios');

const fonts = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",
    j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",
    s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
    S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
};

module.exports.config = {
    name: 'ai',
    version: '2',
    role: 0,
    hasPrefix: false,
    aliases: ["12"],
    description: "Command for AI-generated responses styled with special fonts and emojis.",
    usage: "ex : ai [prompt]",
    credits: 'aesther',
    cooldown: 1,
};

module.exports.run = async function({ api, event, args }) {
    const input = args.join(' ');
    
    if (!input) {
        // Send only the sticker if no input is provided
        api.sendMessage({ attachment: "387545578037993" }, event.threadID);
        api.setMessageReaction("🌐", event.messageID, () => {}, true);
        return;
    }
    
    try {
        const RolePlay = "Répond à cette question avec une décore d'emoji convenable\n>";
        const { data } = await axios.get(`https://api.kenliejugarap.com/freegpt4o8k/?question=${encodeURIComponent(RolePlay + input)}`);
        let response = data.response;
        
        // Replace characters with stylized characters from fonts
        response = response.split('').map(char => fonts[char] || char).join('');
        
        api.sendMessage({ body: `[📑] ᗩEᔕTᕼEᖇ :\n\n${response}` }, event.threadID, event.messageID);
        api.setMessageReaction("🌊", event.messageID, () => {}, true);
        
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage({ body: '⚠️ Error Loading ⚠️' }, event.threadID, event.messageID);
    }
};
