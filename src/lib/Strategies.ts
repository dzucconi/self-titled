// @ts-ignore
import allImages from "../assets/*.jpg";
import { getArticle } from "./language";
import { html, sample, shuffle } from "./utils";
import { Sampler } from "./Sampler";

export type Strategy = { html: string; caption: string };
export type Children = [] | [Strategy] | [Strategy, Strategy];
export type Image = { word: string; img: string };

export const Strategies: Record<
  "of" | "within" | "beside" | "on",
  (children?: Children, a?: Image, b?: Image) => Strategy
> = {
  of: ([children] = [], a = randomImage()) => {
    if (children) return children;

    return {
      html: html(
        `<div class="Of" style="background-image: url(${a.img}); background-size: cover; background-position: center center;"></div>`
      ),
      caption: `${getArticle(a.word)} ${a.word}`,
    };
  },

  within: ([children] = [], a = randomImage(), b = randomImage()) => {
    return {
      html: html(`
        <div class="Within">
          <div class="Within--a" style="background-image: url(${
            a.img
          }); background-size: cover; background-position: center center;">
            <div class="Within--b" style="background-image: url(${
              b.img
            }); background-size: cover; background-position: center center;">
              ${children ? children.html : ""}
            </div>
          </div>
        </div>
      `),
      caption: `${
        children ? children.caption : `${getArticle(b.word)} ${b.word}`
      } within ${getArticle(a.word)} ${a.word}`,
    };
  },

  beside: (children = [], a = randomImage(), b = randomImage()) => {
    const [x, y] = shuffle([
      [
        html(`
            <div class="Beside--a" style=" background-image: url(${
              a.img
            }); background-size: cover; background-position: center center;">
              ${children.length > 0 ? children[0]!.html : ""}
            </div>
          `),
        children.length > 0
          ? children[0]!.caption
          : `${getArticle(a.word)} ${a.word}`,
      ],

      [
        html(`
            <div class="Beside--b" style="background-image: url(${
              b.img
            }); background-size: cover; background-position: center center;">
              ${children.length > 1 ? children[1]!.html : ""}
            </div>
          `),
        children.length > 1
          ? children[1]!.caption
          : `${getArticle(b.word)} ${b.word}`,
      ],
    ]);

    return {
      html: html(`
        <div class="Beside">
          ${x[0]}
          ${y[0]}
        </div>
      `),
      caption: [x[1], [y[1]]].join(" beside "),
    };
  },

  on: (children = [], a = randomImage(), b = randomImage()) => {
    const [x, y] = shuffle([
      [
        html(`
        <div class="On--a" style="background-image: url(${
          a.img
        }); background-size: cover; background-position: center center;">
          ${children.length > 0 ? children[0]!.html : ""}
        </div>
      `),
        children.length > 0
          ? children[0]!.caption
          : `${getArticle(a.word)} ${a.word}`,
      ],
      [
        html(`
        <div class="On--b" style="background-image: url(${
          b.img
        }); background-size: cover; background-position: center center;">
          ${children.length > 1 ? children[1]!.html : ""}
        </div>
      `),
        children.length > 1
          ? children[1]!.caption
          : `${getArticle(b.word)} ${b.word}`,
      ],
    ]);

    return {
      html: html(`
        <div class="On">
          ${x[0]}
          ${y[0]}
        </div>
      `),
      caption: [x[1], [y[1]]].join(" on top of "),
    };
  },
};

export const randomStrategy = () => {
  return sample(Object.keys(Strategies)) as keyof typeof Strategies;
};

export const IMAGES = Object.entries(allImages) as [string, string][];

const extractWordFromFilename = (filename: string) => {
  return filename.split("_")[0];
};

const sampler = new Sampler(IMAGES);

const randomImage = (): Image => {
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
