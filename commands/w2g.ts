import { Message } from "discord.js";
import fetch from "node-fetch";
export default async function getW2GLink(message: Message, args: string[]) {
  if (!args[0]) {
    message.channel.send("Please supply a link to a video! \n `!w2g [link]`");
  } else {
    const videoLink = args[0];
    if (
      (!videoLink.startsWith("https://www.youtube") &&
        !videoLink.startsWith("https://www.youtu.be")) ||
      !videoLink.includes("/watch?v=")
    ) {
      message.channel.send(
        "At the moment this Bot only supports valid YouTube Links."
      );
    } else {
      const w2gRoomLink = await fetch("https://w2g.tv/rooms/create.json", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          w2g_api_key: process.env.W2G_API_KEY,
          share: videoLink,
          bg_color: "#363636",
          bg_opacity: "100",
        }),
      })
        .then((response) => response.json())
        .then((response) => response.streamkey);

      message.channel.send(
        `Here is your W2G Room: \n https://w2g.tv/rooms/${w2gRoomLink}`
      );
    }
  }
}
