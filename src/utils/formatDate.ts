const formatDate = (date: string): string => {
  const stringDate = new Date(date).toISOString().split("T")[0];
  const splitDate = stringDate.split("-");
  const convertedDate = `${splitDate[2]}/${splitDate[1]}`;
  return convertedDate;
};

export default formatDate;
