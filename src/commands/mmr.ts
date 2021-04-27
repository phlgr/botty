import { Command, Message } from "discord.js";
import fetch from "node-fetch";

type summonerMMRInfo = {
  error?: string;
  ranked: {
    avg: number | null;
    err: number;
    warn: boolean;
    summary: string | null;
    tierData: {
      name: string;
      avg: number;
      min: number;
      max: number;
    }[];
    timestamp: number;
    historical: {
      avg: number;
      err: number;
      warn: boolean;
      timestamp: number;
    }[];
    historicalTierData: {
      name: string;
      avg: number;
      avgCount: number;
      min: number;
      max: number;
    }[];
  };
};

export default {
  name: "mmr",
  description: "Get the mmr of a EUW Player.",
  async execute(message: Message, args: string[]) {
    if (!args.length) {
      message.channel.send(
        "No summoner name supplied. \nPlease use command like this: `!mmr <summoner name>`"
      );
      return;
    }

    const summonerName = args.join("+");

    const summonerMMR: summonerMMRInfo = await fetch(
      `https://euw.whatismymmr.com/api/v1/summoner?name=${summonerName}`,
      {
        headers: { "User-Agent": "Discord:com.mmr.botty:v1" },
      }
    ).then((response) => response.json());
    if (summonerMMR.error) {
      message.channel.send(
        "Seems like the summoner couldn't be found. Check the name for typos and if he is playing on EUW!"
      );
      return;
    }
    if (!summonerMMR.ranked.avg) {
      message.channel.send(
        "This summoner hasn't played enough SoloQ to determine a MMR."
      );
      return;
    }

    message.channel.send(
      `${summonerName.replace("+", " ")} has an MMR of ${
        summonerMMR.ranked.avg
      }\n${summonerMMR.ranked.summary
        .replace(/<br ?\/?>/g, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "")}`
    );
  },
} as Command;
