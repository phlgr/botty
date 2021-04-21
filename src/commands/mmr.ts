import { Command, Message } from "discord.js";
import { executionAsyncResource } from "node:async_hooks";

export default {
  name: "mmr",
  description: "Get the mmr of a EUW Player.",
  async execute(message: Message, args: string[]) {},
} as Command;
