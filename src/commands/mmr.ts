import { Command, Message } from "discord.js";
import fetch from "node-fetch";

type summonerMMRInfo = {
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
    const reply = [];
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
    message.channel.send(
      `${summonerName} has an MMR of ${
        summonerMMR.ranked.avg
      }\n${summonerMMR.ranked.summary
        .replace(/<br ?\/?>/g, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "")}`
    );
  },
} as Command;
