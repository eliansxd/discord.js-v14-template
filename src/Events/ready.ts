import { Event } from "../types";

export const event: Event = {
    name: "ready",
    once: true,
    exec: async (client) => {
        // await client.application?.commands.set(client.slashCmds);
        console.log(`Logged in as ${client.user?.tag}`);
    },
};
