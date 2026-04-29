const WORDS_PER_MINUTE = 180;

/** @param {string} content */
export function readingTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

/** @param {string} dateStr */
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Singapore",
  });
}
