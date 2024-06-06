import "dotenv/config";
import { Event } from "../types";
import { ChannelType, Message } from "discord.js";

export const event: Event = {
    name: "messageCreate",
    exec: (client, message: Message) => {
        if (message.author?.bot) return;
        if (message.channel.type == ChannelType.GuildStageVoice) return;
        const serverData = { prefix: process.env.BOT_PREFIX as string };
        const prefix = serverData.prefix;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift()?.toLowerCase();
        if (!cmd || cmd.length === 0) return;
        const command =
            client.commands.get(cmd) ||
            client.commands.get(client.aliases.get(cmd) || "");
        if (command) command.exec(client, message, args);
    },
};
