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
    const caption = `a field of ${a} is on a field of ${b}`;
    return {
      html: `
        <div class="On">
          ${children ? children.html : ""}
          <div class="On--a" style="background-color: ${a}"></div>
          <div class="On--b" style="background-color: ${b}"></div>
        </div>
      `,
      caption: children ? `${children.caption} is on ${caption}` : caption,
    };
  },
  // TODO:
  // between: () => {
  //   return { html: "", caption: "" }
  // },
  // around: () => {
  //   return { html: "", caption: "" }
  // },
  // in: () => {
  //   return { html: "", caption: "" }
  // },
  // at: () => {
  //   return { html: "", caption: "" }
  // },
  // to: () => {
  //   return { html: "", caption: "" }
  // },
  // from: () => {
  //   return { html: "", caption: "" }
  // },
  // through: () => {
  //   return { html: "", caption: "" }
  // },
  // over: () => {
  //   return { html: "", caption: "" }
  // },
  // under: () => {
  //   return { html: "", caption: "" }
  // },
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
    <div class="Caption">${caption}</div>
  `;
};

render(run());

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    render(run());
  }
});
