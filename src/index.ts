import textFit from "textfit";
import { configure } from "queryparams";
import {
  Strategies,
  Strategy,
  Children,
  randomStrategy,
} from "./lib/Strategies";
import { wait } from "./lib/utils";

const CONFIG = configure({
  play: false,
  pause: 5000,
});

const DOM = {
  root: document.getElementById("Root"),
};

const STATE: {
  wait: ReturnType<typeof wait> | null;
} = {
  wait: null,
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
  if (STATE.wait) {
    STATE.wait.cancel();
  }

  const strategy = randomStrategy();

  // If the initial strategy is a dead end, restart the process
  if (!children && strategy === "of") {
    return play({ continuePlayback });
  }

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

  // Wait N ms then render a new frame
  if (strategy === "of") {
    STATE.wait = wait(CONFIG.params.pause);

    const result = await STATE.wait.promise;

    if (result.status === "Cancelled") {
      return;
    }

    return play();
  }

  return play({ children: [{ html, caption }], continuePlayback });
};

window.addEventListener("resize", resizeText);

// @ts-ignore
window.play = play;

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    play();
  }
});

play();
