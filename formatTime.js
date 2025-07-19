function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes > 0) {
    return ` It took you ${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `It took you ${seconds} second${seconds !== 1 ? "s" : ""}`;
  }
}

export default formatTime;
