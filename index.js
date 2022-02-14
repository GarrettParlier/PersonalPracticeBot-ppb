import DiscordJS, { Intents, Interaction} from 'discord.js'
import { Collection } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const client = new DiscordJS.Client ({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    //console.log(command.default.builder)
    client.commands.set(command.default.builder.name, command.default);
}

client.once('ready', () => {
    console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', emphemeral: true });
    }
})
client.login(process.env.TOKEN)