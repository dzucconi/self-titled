// @ts-ignore
import files from "../assets/*.jpg";
import { sample } from "./utils";
import { Sampler } from "./Sampler";
import { Name, Strategies, Image } from "./Strategies";

export const randomStrategy = (): Name => {
  const strat = sample(Object.keys(Strategies)) as Name;

  // Increase density
  // if (strat === "of") {
  //   const next = Math.random() < 0.2 ? "of" : randomStrategy();
  //   return next;
  // }

  return strat;
};

export const IMAGES = Object.entries(files) as [string, string][];

export const extractWordFromFilename = (filename: string) => {
  return filename.split("_")[0];
};

const sampler = new Sampler(IMAGES);

export const randomImage = (): Image => {
  const [filename, img] = sampler.pick();
  const word = extractWordFromFilename(filename);
  return { word, img: img as string };
};

export const getImageByIndex = (index: number): Image => {
  const [filename, img] = IMAGES[index];
  const word = extractWordFromFilename(filename);
  return { word, img: img as string };
};

export const getImageByName = (name: string): Image => {
  const [filename, img] = IMAGES.find(([filename]) =>
    filename.startsWith(name)
  )!;

  const word = extractWordFromFilename(filename);

  return { word, img: img as string };
};
