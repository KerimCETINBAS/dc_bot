import  { Schema, model } from 'mongoose'

class ReactRole{ 
    static newRoleGroup(roleGroupModel) {
        return new Promise(async (resolve, reject) => {
        try {
            const isExist = await this.findOne({
                    name: roleGroupModel.name,
                    guild: roleGroupModel.guild,
                    channel: roleGroupModel.channel,
                    message: roleGroupModel.message,
                
                    
            })
            
            if (isExist) reject('role group already exist') 
            else {
                const new_role = await (this(roleGroupModel)).save()
                if(new_role) resolve(`Rol grubu ${new_role.name} başarı ile oluşturuldu`)
            }

            } catch (error) {
                if(error) reject(error)
            }
        })
    }


    static addReaction(name, guild, reactionModel) {
        return new Promise(async (resolve, reject) => {
           try {
            this.findOne({ name: name, guild: guild }, (err, doc) => {
                console.log(doc.roles)
                const isExist = doc.roles && doc.roles.some(x => x.role === reactionModel.role && x.emoji === reactionModel.emoji)
                if (!isExist) {
                    doc.roles.push(reactionModel)
                    doc.save()
                    resolve({channel : doc.channel, message : doc.message})
                }
                resolve({channel : doc.channel, message : doc.message})

          
            })
           } catch (error) {
               console.log(error)
           }
        }) 
    }
}

const schema = new Schema({
    name: String,
    guild: String,
    channel: String,
    message: String,
    groupType: {
        type: String,
        enum: ['single', 'multiple'],
        default : 'multiple'
    },
    roles: [
        {
            emoji: String,
            role: String
        }
    ]
})
schema.loadClass(ReactRole);

export default model('ReactRoles', schema)