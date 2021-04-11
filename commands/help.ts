import { Message } from "discord.js";

export default function showHelp(message: Message) {
  message.channel.send(
    "`!w2g <youtube link>` \n Sends you a link to a w2g Room with the video in queue. \n `!clash <name>` \n WIP"
  );
}
