export const getTimeAgo = (dateString: string) => {
  const now = new Date().getTime();
  const timeStamp = new Date(dateString).getTime();
  const diffInSeconds = Math.floor((now - timeStamp) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks}주`;
  }
};
