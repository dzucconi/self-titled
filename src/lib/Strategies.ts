import { color, html, sample } from "./utils";

export type Strategy = { html: string; caption: string };
export type Children = [] | [Strategy] | [Strategy, Strategy];

export const Strategies: Record<
  "of" | "within" | "beside" | "on",
  (children?: Children) => Strategy
> = {
  of: ([children] = []) => {
    if (children) return children;

    const a = color();

    return {
      html: html(`<div class="Of" style="background-color: ${a}"></div>`),
      caption: `a field of ${a}`,
    };
  },

  within: ([children] = []) => {
    const a = color();
    const b = color();

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

  beside: (children = []) => {
    const a = color();
    const b = color();

    return {
      html: html(`
        <div class="Beside">
          <div class="Beside--a" style="background-color: ${a}">
            ${children.length > 0 ? children[0].html : ""}
          </div>
          <div class="Beside--b" style="background-color: ${b}">
            ${children.length > 1 ? children[1].html : ""}
          </div>
        </div>
      `),
      caption: `${
        children.length > 0 ? children[0].caption : `a field of ${a}`
      } beside ${
        children.length > 1 ? children[1].caption : `a field of ${b}`
      }`,
    };
  },

  on: ([children] = []) => {
    const a = color();
    const b = color();

    const caption = `a field of ${a} on top of a field of ${b}`;

    return {
      html: html(`
        <div class="On">
          ${children ? children.html : ""}
          <div class="On--a" style="background-color: ${a}"></div>
          <div class="On--b" style="background-color: ${b}"></div>
        </div>
      `),
      caption: children ? `${children.caption} on top of ${caption}` : caption,
    };
  },
};

export const randomStrategy = () => {
  return sample(Object.keys(Strategies)) as keyof typeof Strategies;
};
