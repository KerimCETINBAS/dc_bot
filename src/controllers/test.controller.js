import Controller from '../helpers/controller.js'

export default class Test extends Controller{

    
    static default(msg) {
        msg.reply('Test kontrolcüsü herhangi bir argüman girilmedi 1')
    }   

}

