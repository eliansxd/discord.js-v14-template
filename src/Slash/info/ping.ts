import { ApplicationCommandType } from "discord.js";
import { Slash } from "../../types";

export const slash: Slash = {
    name: "ping",
    description: "Pong!",
    type: ApplicationCommandType.ChatInput,
    exec: async (client, interaction) => {
        const oldTime = Date.now();
        await interaction.reply("🏓 Pong!");
        await interaction.editReply({
            content: `🏓 Pong! \`${Date.now() - oldTime}ms\``,
        });
        return;
    },
};
