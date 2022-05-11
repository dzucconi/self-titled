import textFit from "textfit";
import { configure } from "queryparams";

const CONFIG = configure({
  play: false,
});

const DOM = {
  root: document.getElementById("root"),
};

const COLORS = [
  "beige",
  "black",
  "blue",
  "brown",
  "cyan",
  "gold",
  "green",
  "indigo",
  "magenta",
  "maroon",
  "olive",
  "orange",
  "pink",
  "red",
  "silver",
  "tan",
  "teal",
  "turquoise",
  "violet",
  "white",
  "yellow",
];

const color = () => sample(COLORS);

type Strategy = {
  html: string;
  caption: string;
};

const STRATEGIES: Record<string, (children?: Strategy) => Strategy> = {
  of: (children?: Strategy) => {
    if (children) return children;
    const a = color();
    return {
      html: `
        <div class="Of" style="background-color: ${a}"></div>
      `,
      caption: `a field of ${a}`,
    };
  },
  within: (children?: Strategy) => {
    const a = color();
    const b = color();
    return {
      html: `
        <div class="Within">
          <div class="Within--a" style="background-color: ${a}">
            <div class="Within--b" style="background-color: ${b}">
              ${children ? children.html : ""}
            </div>
          </div>
        </div>
      `,
      caption: `${
        children ? children.caption : `a field of ${b}`
      } within a field of ${a}`,
    };
  },
  beside: (children?: Strategy) => {
    const a = color();
    const b = color();
    const side = sample(["a", "b"]);
    return {
      html: `
        <div class="Beside">
          <div class="Beside--a" style="background-color: ${a}">
            ${side === "a" && children ? children.html : ""}
          </div>
          <div class="Beside--b" style="background-color: ${b}">
            ${side === "b" && children ? children.html : ""}
          </div>
        </div>
      `,
      caption: `${
        side === "a" && children ? children.caption : `a field of ${a}`
      } beside ${
        side === "b" && children ? children.caption : `a field of ${b}`
      }`,
    };
  },
  on: (children?: Strategy) => {
    const a = color();
    const b = color();
    const caption = `a field of ${a} on top of a field of ${b}`;
    return {
      html: `
        <div class="On">
          ${children ? children.html : ""}
          <div class="On--a" style="background-color: ${a}"></div>
          <div class="On--b" style="background-color: ${b}"></div>
        </div>
      `,
      caption: children ? `${children.caption} on top of ${caption}` : caption,
    };
  },
};

const sample = <T>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

const run = (children?: Strategy) => {
  const strategy = sample(Object.keys(STRATEGIES));

  const { html, caption } = STRATEGIES[strategy](children);

  if (strategy === "of") {
    return { html, caption };
  }

  return run({ html, caption });
};

const render = ({ html, caption }: Strategy) => {
  DOM.root.innerHTML = `
    ${html}

    <div id="Caption" class="Caption">
      ${caption}
    </div>
  `;

  textFit(document.getElementById("Caption"));
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const play = async (
  {
    children,
    continuePlayback,
  }: { children?: Strategy; continuePlayback?: boolean } = {
    continuePlayback: CONFIG.params.play,
  }
) => {
  const strategy = sample(Object.keys(STRATEGIES));

  const { html, caption } = STRATEGIES[strategy](children);

  render({ html, caption });

  // Render single frame
  if (!continuePlayback && strategy === "of") {
    return;
  }

  // Continue playback
  if (strategy === "of") {
    await wait(2500);

    return play();
  }

  await wait(50);

  return play({ children: { html, caption }, continuePlayback });
};

window.addEventListener("resize", () => {
  textFit(document.getElementById("Caption"));
});

if (!CONFIG.params.play) {
  window.addEventListener("click", () => {
    play();
  });
}

play();

// TODO:
// - Add reading time + progress indicator
// - Speech synthesis playback
// - Exapnd recursion into both left/right + above/below fields
