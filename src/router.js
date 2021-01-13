import { existsSync } from 'fs'
import { config } from 'dotenv'
config()

const prefix = process.env.BOT_PREFIX


export default async msg => {

    try {
        let args = msg.content.split(prefix)[1]
        args = args.trim().replace(/[\s]+/g , " ").toLowerCase().split(" ")
        /**
         *  @msg {discord message collection}
         *  @controller describes controller class imported
         *  @action  describes controller class function
         *  @args arguments
         **/
        const controller = args.shift()
        const action = args.shift()
        /** if controller file exist */
        if (existsSync(`${__dirname}/controllers/${controller}.controller.js`)) {
            // import & call controller
            let Router = await import(`${__dirname}/controllers/${controller}.controller.js`)
            Router = Router.default
            await Router.Router(msg, controller, action, args)
         
        } else /* Else return error msg */ {
        
            const reply = await msg.reply(`Tanınmayan komut : "${controller}" , Komutu yanlış girdiniz veya sistem tarafından tanınmıyor`)

            setTimeout( () => {
                reply.delete()
                msg.delete()
            },2000)
            
        }

    } catch (e) { console.error.bind(e) }


}