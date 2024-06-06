import Client from "../Client";
import { ApplicationCommandData, CommandInteraction } from "discord.js";

interface Run {
    (client: Client, interaction: CommandInteraction): any;
}

export type Slash = ApplicationCommandData & {
    name: string;
    exec: Run;
};
