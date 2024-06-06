import Client from "../Client";
import { ClientEvents } from "discord.js";

interface Run {
    (client: Client, ...args: any[]): any;
}

export interface Event {
    name: keyof ClientEvents;
    once?: boolean | false;
    exec: Run;
}
