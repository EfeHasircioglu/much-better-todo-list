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
//add modaldaki title girilmediği zaman içinde title gir hocam yazacak şey
let titleWarning = document.getElementById("titleWarning");
let taskList = document.getElementById("taskList");
//check edilip edilmedi mi diye kontrol etmemiz için checkboxların hepsini alıyoruz
let taskCheckboxes = document.getElementsByClassName("task-checkbox");
//initialising the list that will contain the tasks

let tasks = [];

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
    const id = crypto.randomUUID();

    const newTask = {
      id: id,
      title: titleInputValue,
      description: descInputValue,
      category: categorySelectValue,
      dueDate: dueDateSelectValue,
      urgency: urgencySelectValue,
      checked: false,
    };

    createTask(newTask);

    titleInput.value = "";
    descInput.value = "";
    categorySelect.value = "";
    dueDateSelect.value = "";
    urgencySelect.value = "";
    addModal.classList.add("hidden");
    addModal.classList.remove("show");
  });
};

const createTask = (task) => {
  if (task.title === "") {
    titleWarning.innerHTML = "This is a required field.";
    titleInput.classList.add("input-warning");
    return;
  } else {
    titleWarning.innerHTML = "";
    titleInput.classList.remove("input-warning");
  }

  tasks.push(task);
  helperRenderTasks();
  //debug için, sonra kaldırılır!
  console.log("DEBUG: New task added!");
};

const renderTask = (task) => {
  //her bir taskın ayrı containeri
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  //taskların checkbox'u
  const taskCheckbox = document.createElement("div");
  taskCheckbox.classList.add("task-checkbox");
  //checkbox tıklanması için mini-mantık
  taskCheckbox.addEventListener("click", () => {
    toggleTaskCompletion(task.id);
  });
  //task metni
  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.innerHTML = task.title;
  // eğer task checked ise, o zaman o yuvarlağın içinde checked olduğunu belirtecek bir şey göstermemiz gerekiyor.
  if (task.checked) {
    taskCheckbox.classList.add("task-checkbox-checked");
  } else {
    taskCheckbox.classList.remove("task-checkbox-checked");
    taskCheckbox.innerHTML = "";
  }
  //bir de taskı hoverlediğimizde onun yanında çıkan details butonunu ayarlamak lzm
  //şimdi bu mevzuları ekranda görüntülenmesini sağlamamızı gerekiyor.
  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskText);
  //şimdi görevi asıl bütün listeye ekliyoruz görüntüleme olarak
  taskList.appendChild(taskDiv);
};

// helper func for drawing tasks on the screen
const helperRenderTasks = () => {
  taskList.innerHTML = ""; // Önce listeyi DOM'dan temizle
  tasks.forEach((task) => renderTask(task));
};

const toggleTaskCompletion = (id) => {
  // task completion olayını tamamen burada yapacağız
  let targetTask = tasks.find((task) => task.id === id);
  if (targetTask) {
    targetTask.checked = !targetTask.checked; // eğer checked ise unchecked yap, yani toggle
    helperRenderTasks(); // DOM’u güncelle
  }
  console.log("DEBUG: Task check toggled!");
};

addModalFunctionality();
