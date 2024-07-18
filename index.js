const { Client, Events, GatewayIntentBits, Partials, MessageMentions } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: 
    [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers]});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.content.toLocaleLowerCase().includes('https://twitter') || message.content.toLocaleLowerCase().includes('https://x')) {
        if(message.content.toLocaleLowerCase().includes('https://twitter')) {
            message.content = message.content.replace('https://twitter','https://fxtwitter');
        } else {
            message.content = message.content.replace('https://x','https://fxtwitter');
        }
            
        message.channel.send(`<@${message.author.id}> posted: ${message.content}`);
        await message.delete();
    }
});

client.login(token);