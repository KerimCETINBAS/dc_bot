import Controller from '../helpers/controller.js'

export default class Test extends Controller{

    static async tumunu_sil(msg) {
        try {
            if (!await msg.guild.members.cache.find( x => x.id === msg.author.id).permissions.has(['ADMINISTRATOR'])) return reply = await msg.reply('Yetkiniz yok');
            else if (!await msg.guild.members.cache.find(x => x.id === msg.author.id).permissions.has(['MANAGE_MESSAGES'])) return reply = await msg.reply('Yetkiniz yok')
            else {
                let deleted
                do {
                    deleted = await msg.channel.bulkDelete(100);
                } while (deleted.size != 0) 
                return 
                
       
            }
        } catch (error) {
            console.log(error)
        }
    }

    static default(msg) {
        msg.reply('Test kontrolcüsü herhangi bir argüman girilmedi 1')
    }   

}

