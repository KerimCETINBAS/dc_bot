import { Client } from 'discord.js'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import Router from './src/router.js'
import ReactRole from './src/helpers/reactRole'
config()
const prefix = process.env.BOT_PREFIX
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('keppAlive'));


mongoose.connect(`${process.env.DB_URI}`,{useNewUrlParser: true, useFindAndModify : false, useCreateIndex : true, useUnifiedTopology: true })
.catch(e => console.error(e))

mongoose.connection.on('error', console.error.bind(console, 'connection error'))
mongoose.connection.once('open', function() {console.info('db connected') })

client.on('ready', () => {
    console.info(`Bot logged in as ${client.user.username}`)
})


client.on('message', async msg => {
  try {
     if (msg.content.startsWith(prefix) && !msg.author.bot) await Router(msg)
      else return
  } catch(e) {}
})      

client.on('messageReactionAdd', (react, user) => ReactRole(react, user))

client.login(process.env.BOT_TOKEN)