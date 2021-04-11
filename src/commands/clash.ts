import { Message } from "discord.js";

export default {
  name: "clash",
  description: "WIP",
  execute(message: Message) {
    message.channel.send("This is WIP at the moment!");
  },
};
