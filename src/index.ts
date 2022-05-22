import textFit from "textfit";
import { configure } from "queryparams";
import { wait } from "./lib/utils";
import {
  Strategies,
  Strategy,
  Children,
  randomStrategy,
} from "./lib/Strategies";

const CONFIG = configure({
  play: false,
});

const DOM = {
  root: document.getElementById("root"),
};

const resizeText = () => {
  textFit(document.getElementById("Caption"), {
    minFontSize: 16,
    maxFontSize: 9999,
    multiLine: true,
  });
};

const render = ({ html, caption }: Strategy) => {
  DOM.root.innerHTML = `
    ${html}

    <div id="Caption" class="Caption">
      ${caption}
    </div>
  `;

  resizeText();
};

const backfill = (children?: Children): Children => {
  return children
    ? ([...children, Strategies[randomStrategy()]()].slice(0, 2) as Children)
    : [Strategies[randomStrategy()](), Strategies[randomStrategy()]()];
};

const play = async (
  {
    children,
    continuePlayback,
  }: { children?: Children; continuePlayback?: boolean } = {
    continuePlayback: CONFIG.params.play,
  }
) => {
  const strategy = randomStrategy();

  const { html, caption } = (() => {
    switch (strategy) {
      case "beside":
        return Strategies.beside(backfill(children));

      case "on":
        return Strategies.on(backfill(children));

      default:
        return Strategies[strategy](children ? children : []);
    }
  })();

  render({ html, caption });

  // Render single frame
  if (!continuePlayback && strategy === "of") {
    return;
  }

  // Continue playback
  if (strategy === "of") {
    return play();
  }

  await wait(10);

  return play({ children: [{ html, caption }], continuePlayback });
};

window.addEventListener("resize", resizeText);

if (!CONFIG.params.play) {
  window.addEventListener("click", () => {
    play();
  });

  window.addEventListener("touchend", () => {
    play();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      play();
    }
  });
}

play();

// TODO:
// - Add reading time + progress indicator
// - Speech synthesis playback
