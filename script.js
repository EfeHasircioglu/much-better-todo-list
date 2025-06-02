let addModal = document.getElementById("addModal");
let addButton = document.getElementById("addButton");
let addModalClose = document.getElementById("addModalClose");
let addTaskFunctionButton = document.getElementById("addTaskFunctionButton");
let moreOptButton = document.getElementById("moreOptButton");
let moreOptSVG = document.getElementById("moreOptSVG");
let dueDateSelect = document.getElementById("dueDateSelect");
let addMoreOptContainer = document.getElementById("addMoreOptContainer");

//initialising the list that will contain the tasks

tasks = []


//initialising airdatepicker

const enLocale = {
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  today: "Today",
  clear: "Clear",
  dateFormat: "dd.MM.yyyy",
  timeFormat: "HH:mm",
  firstDay: 1,
};

new AirDatepicker(dueDateSelect, {
  autoClose: true,
  timepicker: false, // If you want time too
  locale: enLocale, // sets English
  position: "top center",
});


// functionality of the add modal
const addModalFunctionality = () => {
  // modalın açılması ve kapanması ile ilgili
  addButton.addEventListener("click", () => {
    addModal.classList.remove("hidden");
    addModal.classList.add("show");
  });

  addModalClose.addEventListener("click", () => {
    addModal.classList.add("hidden");
    addModal.classList.remove("show");
  });
  moreOptButton.addEventListener("click", () => {
    addMoreOptContainer.classList.toggle("hidden");
    moreOptSVG.classList.toggle("active"); // re-trigger animation
  });
  add
};

addModalFunctionality();
