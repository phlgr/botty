declare module "discord.js" {
  export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    cooldown?: number;
    execute: (message: Message, args: string[]) => any; // Can be `Promise<SomeType>` if using async
  }
  export interface Client {
    commands: Collection<unknown, Command>;
  }
}
