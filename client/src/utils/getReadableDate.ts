export const getReadableDate = (dateStr: string) => {
  const dateObj = new Date(Date.parse(dateStr));
  const dateFr = dateObj.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateFr;
};
