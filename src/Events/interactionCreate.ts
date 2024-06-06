import Client from "../Client";
import { Event, Slash } from "../types";
import { Interaction } from "discord.js";

export const event: Event = {
    name: "interactionCreate",
    exec: (client, interaction: Interaction) => {
        if (interaction.isCommand()) {
            const cmd: Slash = client.slash.get(interaction.commandName) as any;
            if (cmd) {
                cmd.exec(client, interaction);
            }
        }
    },
};
