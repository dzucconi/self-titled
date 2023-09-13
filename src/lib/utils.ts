export const wait = (ms: number) => {
  let cancel: () => void = () => {};

  const promise: Promise<{ status: string }> = new Promise((resolve) => {
    const timeoutId = setTimeout(() => resolve({ status: "Completed" }), ms);

    cancel = () => {
      clearTimeout(timeoutId);
      resolve({ status: "Cancelled" });
    };
  });

  return {
    promise,
    cancel,
  };
};

export const sample = <T>(xs: T[]) => {
  return xs[Math.floor(Math.random() * xs.length)];
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

export type Color = (typeof COLORS)[number];

export const color = (): Color => {
  return sample(COLORS) as Color;
};

export const html = (string: string) => {
  return string.replace(/>\s+</g, "><").trim();
};

export const shuffle = <T>(array: T[]) => {
  let m = array.length,
    t: T,
    i: number;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

export const readingTimeInMs = (string: string) => {
  return string.split(" ").length * 100;
}