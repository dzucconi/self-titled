import { Image, Name } from "./Strategies";
import { getImageByName } from "./contents";

export const parseSentence = (
  sentence: string
): { strategiesRecord: Name[]; imagesRecord: Image[] } => {
  const words = sentence.split(" ");
  const strategiesRecord: Name[] = [];
  const imagesRecord: Image[] = [];

  let currentWordIndex = 0;

  while (currentWordIndex < words.length) {
    let word = words[currentWordIndex];

    // If the word is an article, skip over it
    if (isArticle(word)) {
      currentWordIndex++;
      continue;
    }

    // If the word is a strategy, record it and move on
    if (isStrategy(word)) {
      strategiesRecord.push(word as Name);
      currentWordIndex++;
      continue;
    }

    // Otherwise, the word must represent an image.
    // So, look up the image and record it, then move on
    let image = getImageByName(word);
    imagesRecord.push(image);
    currentWordIndex++;
  }

  return { strategiesRecord, imagesRecord };
};

function isArticle(word: string): boolean {
  const articles = ["a", "an", "the"];
  return articles.includes(word);
}

function isStrategy(word: string): boolean {
  const strategies = ["of", "within", "beside", "on"];
  return strategies.includes(word);
}
