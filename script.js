let addModal = document.getElementById("addModal");
let addButton = document.getElementById("addButton");
let addModalClose = document.getElementById("addModalClose");
let addTaskFunctionButton = document.getElementById("addTaskFunctionButton");
let moreOptButton = document.getElementById("moreOptButton");
let moreOptSVG = document.getElementById("moreOptSVG");
let addMoreOptContainer = document.getElementById("addMoreOptContainer");
// add modaldaki input elementleri
let titleInput = document.getElementById("titleInput");
let descInput = document.getElementById("descInput");
let categorySelect = document.getElementById("categorySelect");
let urgencySelect = document.getElementById("urgencySelect");
let dueDateSelect = document.getElementById("dueDateSelect");

//initialising the list that will contain the tasks

tasks = [];

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

  //adding the task from the modal
  addTaskFunctionButton.addEventListener("click", () => {
    let titleInputValue = titleInput.value.trim();
    let descInputValue = descInput.value;
    let categorySelectValue = categorySelect.value;
    let dueDateSelectValue = dueDateSelect.value;
    let urgencySelectValue = urgencySelect.value;

    if (titleInputValue === "") {
      return;
    }
    const newTask = {
      title: titleInputValue,
      description: descInputValue,
      category: categorySelectValue,
      dueDate: dueDateSelectValue,
      urgency: urgencySelectValue,
    };

    tasks.push(newTask);

    console.log(tasks);

    titleInput.value = "";
    descInput.value = "";
    categorySelect.value = "";
    dueDateSelect.value = "";
    urgencySelect.value = "";
    addModal.classList.add("hidden");
    addModal.classList.remove("show");
  });
};

addModalFunctionality();
