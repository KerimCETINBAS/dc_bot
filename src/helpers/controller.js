export default class {

    static Router(msg, controller, action, args) {
        action !== null && action !== undefined
            ? this.getRequestedAction(msg, controller, action, args)
            : this.getDefaultAction(msg, controller, action, args)

    }
    static async getDefaultAction(msg, controller, action, args) {
        try {
          await this['default']
            ? this['default'](msg, controller)
            : msg.reply(`Eksik argüman yardım için ";${controller} yardım" yazınız `)
        } catch(e) {}
    }
    static async getRequestedAction(msg, controller, action, args) {
        try {
                  await this[action]
            ? this[action](msg, ...args)
            : msg.reply(`Hatalı argüman ${action}, yardım için ";${controller} yardım" yazınız `)
        } catch(e) {}
    }
}