import Controller from '../helpers/controller.js'
import ReactionRole from '../models/reaction_role.model.js'

export default class extends Controller {
 

    static async yarat(msg, name, channel_id, message_id) {
        let reply
        try {
            if(!name || !channel_id || !message_id) {
                return reply = await msg.reply(`eksik veya yanlış argüman girdiniz. Yardım için ";rol yardım" yazınız`)
                
            }
            if (!await msg.guild.members.cache.find( x => x.id === msg.author.id).permissions.has(['ADMINISTRATOR'])) return reply =  await msg.reply('Yetkiniz yok');
            const Role = {
                name,
                guild: await msg.guild.id,
                channel: channel_id,
                message: message_id,
                groupType
            }
            const createRole = await ReactionRole.newRoleGroup(Role)
            reply = await msg.reply(createRole)
            
        } catch (error) {
           reply = await msg.reply(`Rol grubu "${name}" zaten mevcut`)
        } finally {
            setTimeout(() => {
                reply.delete() 
                msg.delete()
            
           }, 2000)
           
        }
    }

    static async ekle(msg, name, role, emoji) {
        let reply
        try {
            if(!name || !role || !emoji) {
               reply = await msg.reply(`eksik veya yanlış argüman girdiniz. Yardım için ";rol yardım" yazınız`)
               return 
            }
            if (!await msg.guild.members.cache.find( x => x.id === msg.author.id).permissions.has(['ADMINISTRATOR'])) return reply = await msg.reply('Yetkiniz yok');
            const Role = {
                role,
                emoji
            }
            const createRole = await ReactionRole.addReaction(name, await msg.guild.id, Role)
            const reactChannel = await msg.guild.channels.cache.get(createRole.channel.replace(/[<>#]/g, ''))
            const reactMessage = await reactChannel.messages.fetch(createRole.message)
            await reactMessage.react(emoji)
            reply = await msg.reply(' eklendi ')
           
           
        } catch (error) {} 

        finally {
            setTimeout(() => {
                  reply.delete() 
                  msg.delete()
              
             }, 2000)
             
        }
        
    }

    static async sil(msg, name) {
        let reply
        try {
            const sil = await ReactionRole.findOneAndDelete({ name: name, guild: msg.guild.id })
            if (sil === null) reply =await msg.reply(`Rol grubu ${name} mevcut değil`)
            else  reply = await msg.reply(`Rol grubu ${name} başarı ile silindi`)
            setTimeout(async() => {
                await reply.delete() 
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }



    static async tip(msg, name, tip) {

        try {
            
        } catch (error) {
            
        }
    }
    static default(msg) {
        msg.reply('rol kontrolcüsü herhangi bir argüman girilmedi')
    }
}
