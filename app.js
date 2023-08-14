//restricting non numerical characters
window.addEventListener("DOMContentLoaded", (event) => {
  const inputElement = document.querySelectorAll('input[type="number"]');
  inputElement.forEach((inputElement) => {
    inputElement.addEventListener("input", restrictInput);
  });

  function restrictInput(event) {
    let inputValue = event.target.value.trim();
    inputValue = inputValue.replace(/\D/g, "");
    event.target.value = inputValue;
  }
});

//ensuring the input dates are valid
function validateInput() {
  var dayElement = document.getElementById("day");
  var monthElement = document.getElementById("month");
  var yearElement = document.getElementById("year");

  //getting the error placeholders
  var errorDayElement = document.getElementById("error-day");
  var errorMonthElement = document.getElementById("error-month");
  var errorYearElement = document.getElementById("error-year");

  //getting the headings
  var texts1 = document.getElementById("text1");
  var texts2 = document.getElementById("text2");
  var texts3 = document.getElementById("text3");

  //removing the error class as a default
  dayElement.classList.remove("error");
  monthElement.classList.remove("error");
  yearElement.classList.remove("error");

  //removing the error class as a default
  texts1.classList.remove("error");
  texts2.classList.remove("error");
  texts3.classList.remove("error");

  // inital empty error places
  errorDayElement.textContent = "";
  errorMonthElement.textContent = "";
  errorYearElement.textContent = "";

  var day = parseInt(dayElement.value);
  var month = parseInt(monthElement.value);
  var year = parseInt(yearElement.value);

  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();

  var isValid = true;

  // Check if the days are valid months and years

  if (isNaN(day)) {
    dayElement.classList.add("error");
    texts1.classList.add("error");
    errorDayElement.textContent = "Required";
    isValid = false;
  }
  if (isNaN(month)) {
    monthElement.classList.add("error");
    texts2.classList.add("error");
    errorMonthElement.textContent = "Required";
    isValid = false;
  }
  if (isNaN(year)) {
    yearElement.classList.add("error");
    texts3.classList.add("error");
    errorYearElement.textContent = "Required";
    isValid = false;
  }

  if (day < 1 || day > 31) {
    texts1.classList.add("error");
    dayElement.classList.add("error");
    errorDayElement.textContent = "Invalid date";
    isValid = false;
  }

  //check if the months are valid
  if (month < 1 || month > 12) {
    monthElement.classList.add("error");
    texts2.classList.add("error");
    errorMonthElement.textContent = "Invalid month";
    isValid = false;
  }

  //check if the years are valid
  if (year > currentYear) {
    yearElement.classList.add("error");
    texts3.classList.add("error");
    errorYearElement.textContent = "No!";
    isValid = false;
  }

  // handling february
  if (month == 2 && day > 29) {
    dayElement.classList.add("error");
    texts2.classList.add("error");
    errorDayElement.textContent = "Invalid date";
    isValid = false;
  }

  // handling months with 31 days
  if ((month == 1, 3, 5, 7, 8, 10, 12 && day >= 32)) {
    dayElement.classList.add("error");
    texts2.classList.add("error");
    errorDayElement.textContent = "Invalid date";
    isValid = false;
  }

  //hadnling months with 30 days
  if ((month == 4, 6, 9, 11 && day >= 31)) {
    dayElement.classList.add("error");
    texts2.classList.add("error");
    errorDayElement.textContent = "Invalid date";
    isValid = false;
  }

  //handling leap years
  if (year % 4 == 0 && month == 2 && day <= 29) {
    errorDayElement.textContent = "";
    isValid = true;
  }
  if (year % 400 !== 0 && month == 2 && day >= 29) {
    errorDayElement.textContent = "Invalid date";
    isValid = true;
    return;
  }
  if (year < 100) {
    return;
  }

  return isValid;
}

// Calculate the remaining months and days
var remainingMonths = 0;
var remainingDays = 0;

if (monthDiff > 0) {
  remainingMonths = monthDiff;
  remainingDays = currentDate.getDate() - birthdate.getDate();
} else if (monthDiff === 0) {
  remainingDays = currentDate.getDate() - birthdate.getDate();
  if (remainingDays < 0) {
    remainingMonths = 11; // Set remaining months to 11 (December - January)

    // Calculate the number of days in the previous month
    var tempDate = new Date(currentDate.getFullYear(), 0); // Go to the beginning of the current year

    tempDate.setDate(0); // Go to the last day of the previous month
    remainingDays =
      tempDate.getDate() - birthdate.getDate() + currentDate.getDate();
  }
} else {
  remainingMonths = 12 + monthDiff;
  remainingDays = currentDate.getDate() - birthdate.getDate();

  if (remainingDays < 0) {
    remainingMonths--;

    // Calculate the number of days in the previous month
    var tempDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    remainingDays += tempDate.getDate();
  }
}

//the function that calculates on clicking
function calculateAge() {
  if (!validateInput()) {
    return;
  }

  // Get the inputs
  var day = parseInt(document.getElementById("day").value);
  var month = parseInt(document.getElementById("month").value);
  var year = parseInt(document.getElementById("year").value);

  // Create date objects for birthdate and current date
  var birthdate = new Date(year, month - 1, day);
  var currentDate = new Date();

  // Calculate age
  var age = currentDate.getFullYear() - birthdate.getFullYear();
  var monthDiff = currentDate.getMonth() - birthdate.getMonth();
  var dayDiff = currentDate.getDate() - birthdate.getDate();

  // Adjust the age if the current month and day are before the birth month and day
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Calculate remaining months and days
  if (dayDiff < 0) {
    monthDiff--;
    var tempDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      birthdate.getDate()
    );
    dayDiff = (currentDate - tempDate) / (1000 * 60 * 60 * 24);
  }

  if (monthDiff < 0) {
    monthDiff += 12;
  }

  // Add the content
  document.getElementById("days").textContent = Math.floor(dayDiff);
  document.getElementById("months").textContent = monthDiff;
  document.getElementById("years").textContent = age;
}
