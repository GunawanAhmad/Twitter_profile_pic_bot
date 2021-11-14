function time(city, offset) {
  let date = new Date();
  let utc = date.getTime() + date.getTimezoneOffset() * 60000;
  let nd = new Date(utc + 3600000 * offset);
  return "The local time for city" + city + " is " + nd.toLocaleString();
}

console.log(time("Jakarta", "7"));
