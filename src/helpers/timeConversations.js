const convertTime = (now) => {
  // Convert to IST
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedIST = new Intl.DateTimeFormat("en-GB", options).format(now);

  // Format into YYYY-MM-DD HH:mm:ss
  const [date, time] = formattedIST.split(", ");
  const [day, month, year] = date.split("/");

  const finalIST = `${year}-${month}-${day} ${time}`;

  return finalIST;
};

module.exports = convertTime;
