const dateToText = (date) => {

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  let formattedDate = '';
  if (date !== '') {
    const currentDate = new Date(date);
    const day = currentDate.getUTCDate();
    const month = currentDate.getUTCMonth();
    const year = currentDate.getUTCFullYear();
    formattedDate = monthNames[month] + " " + day + ", " + year;
  }

  return formattedDate;
}

export const getOrderedArray = (events) => {
  const orderedArray = events.sort(function (a, b) {
      return parseInt(a.date.replace(/-/gi, '')) - parseInt(a.date.replace(/-/gi, ''));
  });
  return orderedArray
}

export default dateToText;