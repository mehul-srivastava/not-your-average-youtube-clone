export function getRandomLiveStreamPlaceholder() {
  return `https://picsum.photos/id/${Math.ceil(Math.random() * 1000)}/490/200`;
}

export function pluralOrSingular(word: string, count: number) {
  return word + (count === 1 ? "" : "s");
}

export function formatTitle(title: string) {
  return title.slice(0, 60) + (title.length > 60 ? "..." : "");
}

export function timeAgo(startDate: Date) {
  const now = new Date();
  const elapsedTime = now.getTime() - startDate.getTime();

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}

export function displayStandardCount(count: number) {
  if (count < 1_000) {
    return count.toString();
  } else if (count < 1_000_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
}

export function displayLongCount(count: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  return formatter.format(count);
}
