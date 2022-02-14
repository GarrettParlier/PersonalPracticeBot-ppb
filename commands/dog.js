import { SlashCommandBuilder } from '@discordjs/builders'
import fetch from 'node-fetch'

const url = 'https://dog.ceo/api/breeds/image/random'

const Dog = {
    builder: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('get dog pictures'),

    channel: ['pets'],
    async execute(interaction) {
        const res = await fetch(url)
        const img = (await res.json()).message;

        interaction.reply(img)
    }
}

export default Dog