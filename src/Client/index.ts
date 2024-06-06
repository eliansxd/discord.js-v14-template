import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";
import { Command, Slash } from "../types";

class GodoBuck extends Client {
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public slash: Collection<string, string> = new Collection();
    public slashCmds: Slash[] = [];

    public constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
            ],
        });
    }

    public async init() {
        // Login to Bot :)
        this.login(process.env.BOT_TOKEN);

        // Events handlers
        let countEvents = 0;
        const eventsPath = join(__dirname, "..", "Events");
        readdirSync(eventsPath).forEach(async (file) => {
            if (!file.endsWith(".ts")) return;
            countEvents += 1;
            const { event } = await import(`${eventsPath}/${file}`);
            event.once
                ? this.once(event.name, event.exec.bind(null, this))
                : this.on(event.name, event.exec.bind(null, this));
        });
        console.log(`[EVENTS] - Loadded ${countEvents} events.`);

        // Commands handlers
        let countCmds = 0;
        const cmdsPath = join(__dirname, "..", "Commands");
        readdirSync(cmdsPath).forEach(async (folder) => {
            const cmds = readdirSync(`${cmdsPath}/${folder}`).filter((file) =>
                file.endsWith(".ts")
            );
            cmds.forEach(async (file) => {
                countCmds += 1;
                const { command } = await import(
                    `${cmdsPath}/${folder}/${file}`
                );
                this.commands.set(command.name, command);
                if (command?.aliases && command.aliases.length !== 0) {
                    command.aliases.forEach((alias: string) =>
                        this.aliases.set(alias, command.name)
                    );
                }
            });
        });
        console.log(`[CMDS] - Loadded ${countCmds} commands.`);

        // Slash handlers
        let countSlash = 0;
        const slashPath = join(__dirname, "..", "Slash");
        readdirSync(slashPath).forEach(async (folder) => {
            const slash = readdirSync(`${slashPath}/${folder}`).filter((file) =>
                file.endsWith(".ts")
            );
            slash.forEach(async (file) => {
                countSlash += 1;
                const { slash } = await import(
                    `${slashPath}/${folder}/${file}`
                );
                this.slash.set(slash.name, slash);
                this.slashCmds.push(slash);
            });
        });
        console.log(`[CMDS] - Loadded ${countSlash} slash commands.`);
    }
}
export default GodoBuck;
