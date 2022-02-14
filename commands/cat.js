import { SlashCommandBuilder } from '@discordjs/builders'
import fetch from 'node-fetch'

const url = 'https://some-random-api.ml/img/cat'

const Cat = {
    builder: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('get cat pictures'),

    channel: ['pets'],
    async execute(interaction) {
        const res = await fetch(url)
        const img = (await res.json()).link;

        interaction.reply(img)
    }
}

export default Cat