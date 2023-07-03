import { Strategies, getImageByName, Image, Strategy } from "./Strategies";

type ParseResult = {
  strategy: keyof typeof Strategies;
  children?: ParseResult[];
  image?: Image;
};

export const parseSentenceIntoStrategy = (sentence: string): ParseResult => {
  const words = sentence.split(" ");
  let currentIndex = 0;

  const isArticle = (word: string) => ["a", "an", "the"].includes(word);

  const parse = (): ParseResult => {
    if (currentIndex >= words.length) {
      throw new Error("Unexpected end of input");
    }

    let article = isArticle(words[currentIndex]) ? words[currentIndex++] : "";
    let subject = words[currentIndex++];
    let img = getImageByName(subject);

    let preposition = words[currentIndex++];

    switch (preposition) {
      case "within":
        return { strategy: "within", image: img, children: [parse()] };
      case "beside":
        // This parses two children separated by 'beside'.
        let child1 = parse();
        let child2 = parse();
        return { strategy: "beside", image: img, children: [child1, child2] };
      case "on":
        // This parses two children separated by 'on'.
        let childA = parse();
        let childB = parse();
        return { strategy: "on", image: img, children: [childA, childB] };
      default:
        return { strategy: "of", image: img };
    }
  };

  return parse();
};

export const executeStrategy = (result: ParseResult): Strategy => {
  const { strategy, children, image } = result;

  // Convert parsed children back to strategies
  const childStrategies =
    children?.map((child) => executeStrategy(child)) ?? [];

  switch (strategy) {
    case "of":
      return Strategies.of(childStrategies, image);

    case "within":
      return Strategies.within(childStrategies, image);

    case "beside":
      return Strategies.beside(childStrategies, image);

    case "on":
      return Strategies.on(childStrategies, image);

    default:
      throw new Error(`Unknown strategy: ${strategy}`);
  }
};
