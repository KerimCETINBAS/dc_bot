import reaction_roleModel from '../models/reaction_role.model'
import ReactRoleModel from '../models/reaction_role.model'
import SingleGroup from '../helpers/single.rolegroup'

export default async (react, user) => {
    const guild = await react.message.guild.id
    const channel = await react.message.channel.toString()
    const message = await react.message.id
    
    try {
        const isRoleGroup = await ReactRoleModel.findOne({ channel: channel, guild: guild, message: message })
        if (isRoleGroup) {
            const role = await isRoleGroup.roles.find(x => {
                if (x.emoji === react.emoji.toString().toLowerCase()) {
                    return x
                }
            })
            const groupType = isRoleGroup.groupType
            const member = await react.message.guild.members.cache.find(member => member.id === user.id)
            const hasRole = member.roles.cache.has(role.role.replace(/[<@&>]/g, ''))
           
            if (!hasRole) {
           
                    await member.roles.add(await react.message.guild.roles.cache.find(x => x.id === role.role.replace(/[<@&>]/g, '')))
                
            } else {
                await member.roles.remove(await react.message.guild.roles.cache.find(x => x.id === role.role.replace(/[<@&>]/g, '')))
            }

            if (! await user.bot) await react.users.remove(user.id)
            else return
            
            
        }
    } catch (error) {
        console.error(error)
    }
    
}