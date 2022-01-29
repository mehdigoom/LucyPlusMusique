/**
 *
 * @param {require("../structures/DiscordMusicBot")} client
 * @param {require("discord.js").Message} message
 * @returns {void} aka: nothing ;-;
 */
 const fs = require('fs');
cache = ""
module.exports = async (client, message) => {

  if (message.author.bot || message.channel.type === "dm") return;
  let prefix = client.botconfig.DefaultPrefix;

  let GuildDB = await client.GetGuild(message.guild.id);
  if (GuildDB && GuildDB.prefix) prefix = GuildDB.prefix;

  //Initialize GuildDB
  if (!GuildDB) {
    await client.database.guild.set(message.guild.id, {
      prefix: prefix,
      DJ: null,
    });
    GuildDB = await client.GetGuild(message.guild.id);
  }

  //Prefixes also have mention match
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  prefix = message.content.match(prefixMention)
    ? message.content.match(prefixMention)[0]
    : prefix;

  if (message.content.indexOf(prefix) !== 0){
//Lucy here



if(cache == ""){
 
//retire les carracaire qui penvent tout cassé et met la chaine propre dans cache

 var mystring = message.content;
 ocurence = message.content.length
 for (let pas = 0; pas == ocurence; pas++) {
  mystring = mystring.replace('"','_');
  mystring = mystring.replace('?','_');
}
cache = mystring
return

}else{
//retire les carracaire qui penvent tout cassé et met la chaine propre dans cache
var mystring = message.content;
ocurence = message.content.length
for (let pas = 0; pas == ocurence; pas++) {
 mystring = mystring.replace('"','_');
 mystring = mystring.replace('?','_');
}
var msg = mystring

//save prosses
var jsonData = '{"r": "'+ msg+ '", "demandeHumain":"0"}'
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);

var jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);
 
fs.writeFile('save/'+cache+'.json', jsonContent, 'utf8', function (err) {
    if (err) {
      
      console.log(err) 
        cache = ""
 
        return client.sendTime(
          message.channel,
          " :x: Oups, j'ai pas pu apprendre des dernier messages je viens de logué l'erreur. :x: "
          
        );
       
    }
 
    console.log("Apprentissage de ''" + cache+ "''" );
    cache = ""
    return
});



    console.log(message.content)
}








  }else{
    //commende bot musique
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //Making the command lowerCase because our file name will be in lowerCase
    const command = args.shift().toLowerCase();
  
    //Searching a command
    const cmd =
      client.commands.get(command) ||
      client.commands.find((x) => x.aliases && x.aliases.includes(command));
  
    //Executing the codes when we get the command or aliases
  
  
    
    if (cmd) {
      if (
        (cmd.permissions &&
          cmd.permissions.channel &&
          !message.channel
            .permissionsFor(client.user)
            .has(cmd.permissions.channel)) ||
        (cmd.permissions &&
          cmd.permissions.member &&
          !message.channel
            .permissionsFor(message.member)
            .has(cmd.permissions.member)) ||
        (cmd.permissions &&
          GuildDB.DJ &&
          !message.channel
            .permissionsFor(message.member)
            .has(["ADMINISTRATOR"]) &&
          !message.member.roles.cache.has(GuildDB.DJ))
      )
        return client.sendError(
          message.channel,
          "Missing Permissions!" + GuildDB.DJ
            ? " You need the `DJ` role to access this command."
            : ""
        );
      cmd.run(client, message, args, { GuildDB });
      client.CommandsRan++;
    }else{
      return client.sendError(
        message.channel,
        "Tu t'es pris pour quoi ?!"
          ? " Méme si je suis une super squale je peut pas comprendre tes commende inventé"
          : "T'es fou toi :3 "
      );
    };
  
   
  
    return
    
  } ;


};
