const UNCOUNTABLES = [
  "advice",
  "air",
  "anger",
  "art",
  "bread",
  "cheese",
  "clothing",
  "coffee",
  "currency",
  "earth",
  "education",
  "equipment",
  "food",
  "fruit",
  "furniture",
  "hair",
  "health",
  "homework",
  "information",
  "jewelry",
  "luggage",
  "machinery",
  "mail",
  "makeup",
  "meat",
  "milk",
  "money",
  "music",
  "news",
  "pollution",
  "research",
  "rice",
  "sea",
  "snow",
  "tea",
  "time",
  "traffic",
  "trash",
  "vocabulary",
  "water",
  "weather",
  "wildlife",
  "wine",
];

const SINGULAR_END_WITH_S = [
  "analysis",
  "barracks",
  "basis",
  "bonus",
  "bus",
  "business",
  "canvas",
  "class",
  "crisis",
  "cross",
  "crossroads",
  "diagnosis",
  "dress",
  "ellipsis",
  "glass",
  "grass",
  "headquarters",
  "hypothesis",
  "means",
  "oasis",
  "paralysis",
  "series",
  "species",
  "synopsis",
  "thesis",
];

const UNSOUNDED = ["hour"];

const STANDALONE = [
  "paralysis",
  "love",
  "knowledge",
  "power",
  "voltage",
  "peace",
];

const PAIRS = ["headphones", "scissors", "trousers", "gloves"];

const THE = ["sea", "truth", "weather", "rain"];

const isPlural = (word: string) => {
  return (
    (UNCOUNTABLES.includes(word) || word.endsWith("s")) &&
    !SINGULAR_END_WITH_S.includes(word)
  );
};

export const getArticle = (word: string) => {
  if (PAIRS.includes(word)) return "a pair of";
  if (THE.includes(word)) return "the";
  if (STANDALONE.includes(word)) return "";
  if (isPlural(word)) return "";
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(word[0]) || UNSOUNDED.includes(word) ? "an" : "a";
};
