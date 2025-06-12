let addModal = document.getElementById("addModal");
let addButton = document.getElementById("addButton");
let addModalClose = document.getElementById("addModalClose");
let addTaskFunctionButton = document.getElementById("addTaskFunctionButton");
let moreOptButton = document.getElementById("moreOptButton");
let moreOptSVG = document.getElementById("moreOptSVG");
let addMoreOptContainer = document.getElementById("addMoreOptContainer");
//filtreleme butonları: all, completed ve due
let allFilterButton = document.getElementById("allTasksButton");
let completedFilterButton = document.getElementById("completedButton");
let dueFilterButton = document.getElementById("dueButton");
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
// all tasks menüsünde başlıyoruz uygulamaya, onun için onun stili aktif olacak
allFilterButton.classList.add("button-active");
//hengi menüde olduğumuzu takip etmek için
let activeMenu = 0; // 0: All Tasks, 1: Completed, 2: Due

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
  helperRenderTasks(activeMenu);
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
    toggleTaskCompletion(task.id, taskDiv); // checkbox tıklandığında olan şey!
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
const helperRenderTasks = (activeMenu) => {
  taskList.innerHTML = ""; // Önce listeyi DOM'dan temizle
  let filteredTasks = [];
  if (activeMenu === 0) {
    // Eğer şuan All Tasks'ı görüntülüyorsak, ki burada completed'ler olmayacak
    filteredTasks = tasks.filter((task) => !task.checked);
  } else if (activeMenu === 1) {
    //Completed görevler burada görünecek
    filteredTasks = tasks.filter((task) => task.checked); // sadece task.checked olan görevler filteredTasks içine dahil ediliyor
  } else if (activeMenu === 2) {
    filteredTasks = tasks.filter((task) => task.dueDate < Date.now()); // due olan görevler 3. menüde görünecek
  }
  filteredTasks.forEach((task) => renderTask(task));
};

const menuChangeLogic = () => {
  //burada ise şu all, completed ve due buttonlarına her basıldığında activeMenu değeri değişecek, ama aynı zamanda butonların animasyonları da halledilecek, güzel gözükmesi gerekiyor
  // !! bir de completed'deki görevlerin tikli görünmesi gerekiyor ki bence bu konuda bir sıkıntı yaşanmaz
  allFilterButton.addEventListener("click", () => {
    activeMenu = 0;
    helperRenderTasks(activeMenu);
    allFilterButton.classList.add("button-active");
    dueFilterButton.classList.remove("button-active");
    completedFilterButton.classList.remove("button-active");
  });

  completedFilterButton.addEventListener("click", () => {
    activeMenu = 1;
    helperRenderTasks(activeMenu);
    allFilterButton.classList.remove("button-active");
    dueFilterButton.classList.remove("button-active");
    completedFilterButton.classList.add("button-active");
  });

  dueFilterButton.addEventListener("click", () => {
    activeMenu = 2;
    helperRenderTasks(activeMenu);
    allFilterButton.classList.remove("button-active");
    dueFilterButton.classList.add("button-active");
    completedFilterButton.classList.remove("button-active");
  });
};

const toggleTaskCompletion = (id, taskDiv) => {
  // task completion olayını tamamen burada yapacağız
  let targetTask = tasks.find((task) => task.id === id);
  if (targetTask) {
    targetTask.checked = !targetTask.checked; // eğer checked ise unchecked yap, yani toggle
    //burada fade out animasyonunu yapacağız, bütün menüler için geçerli olacak çünkü uncheck yaparsak da aynı şey olmalı, her türlü güzel gözükmeli yani
    taskDiv.classList.add("task-checked-animation"); // taskımızı fade out yapan sınıfı ekliyoruz task'a

    taskDiv.addEventListener(
      // burdaki kodlar, transition bitince çalışacak ve bu sayede animasyon sorunsuz şekilde gösterilecek!
      "transitionend",
      () => {
        helperRenderTasks(activeMenu); // DOM’u güncelle
      },
      { once: true }
    );
  }
  console.log("DEBUG: Task check toggled!");
};

addModalFunctionality();
menuChangeLogic();
