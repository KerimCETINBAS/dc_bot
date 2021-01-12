import { exists, existsSync } from 'fs'
import { config } from 'dotenv'
config()

const prefix = process.env.BOT_PREFIX

export default async msg => {
    let args = msg.content.split(prefix)[1]
    args = args.trim().replace(/[\s]+/g , " ").toLowerCase().split(" ")
    
    const controller = args.shift()
    const action = args.shift()

    try {
        if (existsSync(`${__dirname}/controllers/${controller}.controller.js`)) {
            let Router = await import(`${__dirname}/controllers/${controller}.controller.js`)
            Router = Router.default
            console.log(controller, action)
            await Router.Router(msg, controller, action, args)
            await msg.delete()
        } else msg.reply(`Tanınmayan komut : "${controller}" , Komutu yanlış girdiniz veya sistem tarafından tanınmıyor`)
        

    } catch (error) { console.error(error) }

}