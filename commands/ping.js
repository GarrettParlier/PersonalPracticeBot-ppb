import { SlashCommandBuilder } from '@discordjs/builders'


const Ping = {
    builder: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('says pong'),
    async execute(interaction) {
        interaction.reply('pong')
  }
}

export default Ping