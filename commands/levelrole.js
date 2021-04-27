const { MessageEmbed } = require('discord.js')
const { util } = require('discord.js')
exports.run = (client, msg, args) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) args[0] = 1

    let page = args[0]
    let thing = 1;
    let array = client.settings.get(msg.guild.id, "roles")
    let d = array.sort((a, b) => b.level - a.level)
    const paginated = util.paginate(d, page, Math.floor(30))
    let embed = new MessageEmbed()
    .setAuthor(`Level Roles for ${msg.guild.name}.`, msg.guild.iconURL())
    .setColor("#FFC0CB")
    .setDescription(paginated.items.map(x => `${msg.guild.roles.cache.get(x.role) ? msg.guild.roles.cache.get(x.role).toString() : "Unknown Role"} -> **(${x.level})**`))
        msg.channel.send(embed)

}

module.exports.help = {
    name:"levelroles",
    usage:"!levelroles <page>",
  }