import { color, html, sample, shuffle } from "./utils";

export type Strategy = { html: string; caption: string };
export type Children = [] | [Strategy] | [Strategy, Strategy];

export const Strategies: Record<
  "of" | "within" | "beside" | "on",
  (children?: Children) => Strategy
> = {
  of: ([children] = [], a = color()) => {
    if (children) return children;

    return {
      html: html(`<div class="Of" style="background-color: ${a}"></div>`),
      caption: `a field of ${a}`,
    };
  },

  within: ([children] = [], a = color(), b = color()) => {
    return {
      html: html(`
        <div class="Within">
          <div class="Within--a" style="background-color: ${a}">
            <div class="Within--b" style="background-color: ${b}">
              ${children ? children.html : ""}
            </div>
          </div>
        </div>
      `),
      caption: `${
        children ? children.caption : `a field of ${b}`
      } within a field of ${a}`,
    };
  },

  beside: (children = [], a = color(), b = color()) => {
    const [x, y] = shuffle([
      [
        html(`
            <div class="Beside--a" style="background-color: ${a}">
              ${children.length > 0 ? children[0].html : ""}
            </div>
          `),
        children.length > 0 ? children[0].caption : `a field of ${a}`,
      ],

      [
        html(`
            <div class="Beside--b" style="background-color: ${b}">
              ${children.length > 1 ? children[1].html : ""}
            </div>
          `),
        children.length > 1 ? children[1].caption : `a field of ${b}`,
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

  on: (children = [], a = color(), b = color()) => {
    const [x, y] = shuffle([
      [
        html(`
        <div class="On--a" style="background-color: ${a}">
          ${children.length > 0 ? children[0].html : ""}
        </div>
      `),
        children.length > 0 ? children[0].caption : `a field of ${a}`,
      ],
      [
        html(`
        <div class="On--b" style="background-color: ${b}">
          ${children.length > 1 ? children[1].html : ""}
        </div>
      `),
        children.length > 1 ? children[1].caption : `a field of ${b}`,
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
