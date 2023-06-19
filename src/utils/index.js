export const formatDate = (myDate) => {
  const date = new Date(myDate);

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return formattedDate;
}

export const checkProfileExists = (profile) => {
  let defaultImg = "defaultProfile.jpeg";
  if (profile) {
    defaultImg = profile;
  }
  return defaultImg;
};