// Define constants
const WORDS_PER_MIN = 275;
const IMAGE_READ_TIME = 12;
const CHINESE_KOREAN_READ_TIME = 500;
const IMAGE_TAGS = ["img", "Image"];

// Strip whitespace from both ends of a string
function stripWhitespace(string: string) {
  return string.replace(/^\s+/, "").replace(/\s+$/, "");
}

// Count the number of images in a string based on specified image tags
function imageCount(imageTags: string[], str: string) {
  const combinedImageTags = imageTags.join("|");
  const pattern = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`;
  const reg = new RegExp(pattern, "g");
  return (str.match(reg) || []).length;
}

// Calculate the estimated read time for images in a string
function imageReadTime(
  customImageTime = IMAGE_READ_TIME,
  tags = IMAGE_TAGS,
  str: string
) {
  let seconds = 0;
  const count = imageCount(tags, str);

  if (count > 10) {
    seconds = (count / 2) * (customImageTime + 3) + (count - 10) * 3; // Formula: n/2(a+b) + 3 sec/image
  } else {
    seconds = (count / 2) * (2 * customImageTime + (1 - count)); // Formula: n/2[2a+(n-1)d]
  }
  return {
    time: seconds / 60, // Convert to minutes
    count,
  };
}

// Remove HTML tags from a string
function stripTags(str: string) {
  const pattern = /<\w+(\s+("[^"]"|\'[^\']'|[^>])+)?>|<\/\w+>/;
  const reg = new RegExp(pattern, "gi");
  return str.replace(reg, "");
}

// Count the number of words in a string
function wordsCount(str: string) {
  const pattern = "w+";
  const reg = new RegExp(pattern, "g");
  return (str.match(reg) || []).length;
}

// Calculate the estimated read time for non-English characters in a string
function otherLanguageReadTime(str: string) {
  const pattern =
    "[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]";
  const reg = new RegExp(pattern, "g");
  const count = (str.match(reg) || []).length;
  const time = count / CHINESE_KOREAN_READ_TIME;
  const formattedString = str.replace(reg, "");
  return {
    count,
    time,
    formattedString,
  };
}

// Calculate the estimated read time for words in a string
function wordsReadTime(str: string, wordsPerMin = WORDS_PER_MIN) {
  const {
    count: characterCount,
    time: otherLanguageTime,
    formattedString,
  } = otherLanguageReadTime(str);
  const wordCount = wordsCount(formattedString);
  const wordTime = wordCount / wordsPerMin;
  return {
    characterCount,
    otherLanguageTime,
    wordTime,
    wordCount,
  };
}

// Convert read time in minutes to human-readable format
function humanizeTime(time: number) {
  if (time < 0.5) {
    return "less than a minute";
  }
  if (time >= 0.5 && time < 1.5) {
    return "1 minute";
  }
  return `${Math.ceil(time)} minutes`;
}

/**
 * Calculates the estimated read time for a given string of text, taking into account the number of images and other languages present in the text.
 * @param {string} str - The text to calculate the read time for.
 * @param {number} customWordTime - The estimated time (in seconds) to read one word.
 * @param {number} customImageTime - The estimated time (in seconds) to read one image.
 * @param {string[]} imageTags - An array of HTML image tags to search for in the text.
 * @returns {{
 *   humanizedDuration: string;
 *   duration: number;
 *   totalWords: number;
 *   wordTime: number;
 *   totalImages: number;
 *   imageTime: number;
 *   otherLanguageTimeCharacters: number;
 *   otherLanguageTime: number;
 * }} An object containing the estimated read time, total number of words, total number of images, and estimated time to read other languages.
 */

export function getReadTime(
  str: string,
  customWordTime: number = WORDS_PER_MIN,
  customImageTime: number = IMAGE_READ_TIME,
  imageTags: string[] = IMAGE_TAGS
): {
  humanizedDuration: string;
  duration: number;
  totalWords: number;
  wordTime: number;
  totalImages: number;
  imageTime: number;
  otherLanguageTimeCharacters: number;
  otherLanguageTime: number;
} {
  // Calculate the estimated read time for images in the text.
  const { time: imageTime, count: imageCount } = imageReadTime(
    customImageTime,
    imageTags,
    str
  );

  // Strip HTML tags and whitespace from the text.
  const strippedString = stripTags(stripWhitespace(str));

  // Calculate the estimated read time for words and other languages in the text.
  const { characterCount, otherLanguageTime, wordTime, wordCount } =
    wordsReadTime(strippedString, customWordTime);

  // Return the final read time object with all calculated values.
  return {
    humanizedDuration: humanizeTime(imageTime + wordTime),
    duration: imageTime + wordTime,
    totalWords: wordCount,
    wordTime,
    totalImages: imageCount,
    imageTime,
    otherLanguageTimeCharacters: characterCount,
    otherLanguageTime,
  };
}

// Reference: https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
export function slugify(str: string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
