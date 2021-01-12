import { Client } from 'discord.js'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import Router from './src/router.js'
import ReactRole from './src/helpers/reactRole'
config()
const prefix = process.env.BOT_PREFIX
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })


mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{useNewUrlParser: true, useFindAndModify : false, useCreateIndex : true, useUnifiedTopology: true })

mongoose.connection.on('error', console.error.bind(console, 'connection error'))
mongoose.connection.once('open', function() {console.info('db connected') })

client.on('ready', () => {
    console.info(`Bot logged in as ${client.user.username}`)
})


client.on('message', async msg => {
    if (msg.content.startsWith(prefix) && !msg.author.bot) Router(msg)
    else return
})      

client.on('messageReactionAdd', (react, user) => ReactRole(react, user))

client.login(process.env.BOT_TOKEN)