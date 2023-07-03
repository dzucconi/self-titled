import { getArticle } from "./language";
import { html, shuffle } from "./utils";
import { randomImage } from "./contents";

export type Name = "of" | "within" | "beside" | "on";
export type Strategy = { html: string; caption: string };
export type Children = [] | [Strategy] | [Strategy, Strategy];
export type Image = { word: string; img: string };

export const Strategies: Record<
  Name,
  ({
    children,
    a,
    b,
  }?: {
    children?: Children;
    a?: Image;
    b?: Image;
  }) => Strategy
> = {
  of: (
    { children = [], a = randomImage() } = { children: [], a: randomImage() }
  ) => {
    if (children.length > 0) return children[0]!;

    return {
      html: html(
        `<div class="Of" style="background-image: url(${a.img}); background-size: cover; background-position: center center;"></div>`
      ),
      caption: `${getArticle(a.word)} ${a.word}`,
    };
  },

  within: (
    { children = [], a = randomImage(), b = randomImage() } = {
      children: [],
      a: randomImage(),
      b: randomImage(),
    }
  ) => {
    return {
      html: html(`
        <div class="Within">
          <div class="Within--a" style="background-image: url(${
            a.img
          }); background-size: cover; background-position: center center;">
            <div class="Within--b" style="background-image: url(${
              b.img
            }); background-size: cover; background-position: center center;">
              ${children.length > 0 ? children[0]!.html : ""}
            </div>
          </div>
        </div>
      `),
      caption: `${
        children.length > 0
          ? children[0]!.caption
          : `${getArticle(b.word)} ${b.word}`
      } within ${getArticle(a.word)} ${a.word}`,
    };
  },

  beside: (
    { children = [], a = randomImage(), b = randomImage() } = {
      children: [],
      a: randomImage(),
      b: randomImage(),
    }
  ) => {
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

  on: (
    { children = [], a = randomImage(), b = randomImage() } = {
      children: [],
      a: randomImage(),
      b: randomImage(),
    }
  ) => {
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
