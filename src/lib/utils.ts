export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sample = <T>(xs: T[]) => {
  return xs[Math.floor(Math.random() * xs.length)];
};

export const color = () => {
  return sample([
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
  ]);
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
