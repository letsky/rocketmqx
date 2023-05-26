import dayjs from "dayjs";

export const formatTimestamp = (timestamp) => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
}