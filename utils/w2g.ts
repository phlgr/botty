import fetch from "node-fetch";
export default async function getW2GLink(message) {
  if (!message.content.split(" ")[1]) {
    message.channel.send("Please supply a link to a video! \n `!w2g [link]`");
  } else {
    const videoLink = message.content.split(" ")[1];
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
