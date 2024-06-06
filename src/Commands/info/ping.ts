import { Command } from "../../types";

export const command: Command = {
    name: "ping",
    description: "Pong!",
    exec: async (client, message, args) => {
        const oldTime = Date.now();
        const oldMsg = message.channel.send("🏓 Pong!");
        (await oldMsg).edit({
            content: `🏓 Pong! \`${Date.now() - oldTime}ms\``,
        });
    },
};
