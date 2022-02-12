(async () => {
    const Discord = require("discord.js");
    const Database = require("easy-json-database");
    const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const s4d = {
        Discord,
        database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),
        joiningMember: null,
        reply: null,
        tokenInvalid: false,
        tokenError: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };
    s4d.client = new s4d.Discord.Client({
        intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
        partials: ["REACTION"]
    });

    await s4d.client.login('OTQxOTg2MTIwMTYwNDA3NTcy.Ygd68A.DjGU0i94ApM0oMrlt1vdcFH_T9c').catch((e) => {
        s4d.tokenInvalid = true;
        s4d.tokenError = e;
    });

    s4d.client.on('ready', async () => {
        s4d.client.channels.cache.find((channel) => channel.name === '#général').send(String('cc'));

    });


    return s4d;
})();
