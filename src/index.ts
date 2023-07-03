import textFit from "textfit";
import { configure } from "queryparams";
import { Strategies, Strategy, Children } from "./lib/Strategies";
import { wait } from "./lib/utils";
import { getImageByName, randomStrategy } from "./lib/contents";

const CONFIG = configure({
  play: false,
});

const DOM = {
  root: document.getElementById("Root"),
};

const resizeText = () => {
  const el = document.getElementById("Caption");

  if (!el) return;

  setTimeout(() => {
    el.style.display = "flex";

    textFit(el, {
      minFontSize: 16,
      maxFontSize: 9999,
      multiLine: true,
    });
  }, 0);
};

const render = ({ html, caption }: Strategy) => {
  if (!DOM.root) return;

  DOM.root.innerHTML = `
    ${html}

    <div id="Caption" class="Caption" style="display: none;">
      ${caption}
    </div>

    <button id="Next" class="Next" onclick="play()"></button>
  `;

  resizeText();
};

const backfill = (children?: Children): Children => {
  return children
    ? ([...children, Strategies[randomStrategy()]()].slice(0, 2) as [
        Strategy,
        Strategy
      ])
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

  // If the initial strategy is a dead end, restart the process
  if (!children && strategy === "of") {
    return play({ continuePlayback });
  }

  const { html, caption } = (() => {
    switch (strategy) {
      case "beside":
        return Strategies.beside({ children: backfill(children) });

      case "on":
        return Strategies.on({ children: backfill(children) });

      default:
        return Strategies[strategy]({ children: children ? children : [] });
    }
  })();

  console.log("rendering", caption);

  render({ html, caption });

  // Render single frame
  if (!continuePlayback && strategy === "of") {
    return;
  }

  // Wait 5 seconds then render a new frame
  if (strategy === "of") {
    await wait(5000);

    return play();
  }

  return play({ children: [{ html, caption }], continuePlayback });
};

window.addEventListener("resize", resizeText);

// @ts-ignore
window.play = play;

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    console.log("play");
    play();
  }
});

play();
