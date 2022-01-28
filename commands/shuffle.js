const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shuffle",
  description: "Shuffles the queue",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["shuff"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Je dis rien et joue aucune musique donc demande pas nimp baka**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **écoute moi bien baka. Si tu n'est pas dans un salon vocal je ne peut pas t'aider.**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **écoute moi bien baka. Si tu n'est pas dans un salon vocal je ne peut pas t'aider.**"
      );
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(
        message.channel,
        "❌ | **Not enough songs in the queue to shuffle!**"
      );
    player.queue.shuffle();
    await client.sendTime(message.channel, "✅ | Shuffled the queue!");
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **écoute moi bien baka. Si tu n'est pas dans un salon vocal je ne peut pas t'aider.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          ":x: | **écoute moi bien baka. Si tu n'est pas dans un salon vocal je ne peut pas t'aider.**"
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction.channel,
          "❌ | **Je dis rien et joue aucune musique donc demande pas nimp baka**"
        );
      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(
          interaction,
          "❌ | **Not enough songs in the queue to shuffle!**"
        );
      player.queue.shuffle();
      client.sendTime(interaction, "✅ | Shuffled the queue!");
    },
  },
};
