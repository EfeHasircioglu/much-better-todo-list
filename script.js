//TODO: details menüsündeki edit ve delete butonlarının fonksiyonları. edit butonuna basıldığı zaman elementlerin hepsi editlenebilir olur ve arkaplanlarının rengi gri bir şey olur, editlenebildiklerini belirtmek için ve bir de alttaki butonlar save ve discard olarak değişir
//TODO: bir de arama fonksiyonu var, o çok zor olmaz, hallederiz
//TODO: bir task due ise o taskın arka planı kırmızı olabilir, veya yanında Due! diyen bir badge çıkar, ki ikincisi daha mantıklı
let addModal = document.getElementById("addModal");
let addModalInternal = document.getElementById("addModalInternal");
let addButton = document.getElementById("addButton");
let addModalClose = document.getElementById("addModalClose");
let addTaskFunctionButton = document.getElementById("addTaskFunctionButton");
// add modaLı içerisindeki more option olayları
let moreOptButton = document.getElementById("moreOptButton");
let moreOptSVG = document.getElementById("moreOptSVG");
let addMoreOptContainer = document.getElementById("addMoreOptContainer");
// eğer gösterilecek task yoksa emptyState gösterilecek
let taskListEmptyState = document.getElementById("emptyState");
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
//hızlı bir şekilde görev eklemek için olan input
let fastTaskAdd = document.getElementById("fastTaskAdd");
//add modaldaki title girilmediği zaman içinde title gir hocam yazacak şey
let titleWarning = document.getElementById("titleWarning");
let taskList = document.getElementById("taskList");
//check edilip edilmedi mi diye kontrol etmemiz için checkboxların hepsini alıyoruz
let taskCheckboxes = document.getElementsByClassName("task-checkbox");
//detayların ve edit-silme işleminin gösterileceği modalın elementlerini alıyoruz
let detailsModalContainer = document.getElementById("detailsModal");
let detailsModalInner = document.getElementById("detailsModalInternal");
let detailsItemTitle = document.getElementById("detailsItemTitle");
let detailsItemDescription = document.getElementById("detailsItemDescription");
let detailsItemCategory = document.getElementById("detailsItemCategory");
let detailsItemDueDate = document.getElementById("detailsItemDueDate");
let detailsItemUrgency = document.getElementById("detailsItemUrgency");
let detailsDeleteButton = document.getElementById("detailsDeleteButton");
let detailsEditButton = document.getElementById("detailsEditButton");
let detailsCloseButton = document.getElementById("detailsModalClose");
let detailsModalMore = document.getElementById("detailsModalMore");
let detailsSaveEditButton = document.getElementById("detailsSaveEditButton");
let detailsDiscardEditButton = document.getElementById(
  "detailsDiscardEditButton"
);
let detailsEditStateButtonsContainer = document.getElementById(
  "detailsEditStateButtonsContainer"
);

//edit durumundaykenki diğer editlenebilecek detaylar
let editTitleInput = document.getElementById("editTitleInput");
let editDescriptionInput = document.getElementById("editDescriptionInput");
let editCategoryInput = document.getElementById("editCategoryInput");
let editDueDateInput = document.getElementById("editDueDateInput");
let editUrgencyInput = document.getElementById("editUrgencyInput");

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

//bu da edit menüsündeki due date için olan input.
new AirDatepicker(editDueDateInput, {
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
    addModal.addEventListener(
      "transitionend",
      () => {
        addModalReset();
      },
      { once: true }
    );
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
    addModalReset();
  });
};

const detailedModalFunctionality = () => {
  //taskın üzerine basıldığı zaman açılan menü
  detailsCloseButton.addEventListener("click", () => {
    //şimdiki sorun şu ki, buna basıldığı zaman eğer modalın edit menüsü açık ise kapanacak ve eski haline dönecek
    detailsModalContainer.classList.add("hidden");
    detailsModalContainer.classList.remove("show");
    detailsModalContainer.addEventListener("transitionend", (e) => {
      if (e.target === detailsModalContainer) {
        detailedModalSwitchStates(false);
      }
    });
  });

  detailsEditButton.addEventListener("click", () => {
    editTitleInput.value = currentDetailedTask.title;
    editDescriptionInput.value = currentDetailedTask.description;
    editCategoryInput.value = currentDetailedTask.category;
    editDueDateInput.value = currentDetailedTask.dueDate;
    editUrgencyInput.value = currentDetailedTask.urgency;
    detailedModalSwitchStates(true);
  });

  detailsDiscardEditButton.addEventListener("click", () => {
    detailedModalSwitchStates(false);
    taskEditVisualCheck(currentDetailedTask);
  });
  //artık burada yaptığımız (ya da yapmadığımız) editleri yine o göreve kaydedeceğiz
  detailsSaveEditButton.addEventListener("click", () => {
    //inputlarımızdan gerekli değerleri alıyoruz
    const newTitle = editTitleInput.value.trim();
    const newDescription = editDescriptionInput.value.trim();
    const newCategory = editCategoryInput.value;
    const newDueDate = editDueDateInput.value;
    const newUrgency = editUrgencyInput.value;
    //editlemekte olduğumuz taskı bulup onu güncelliyoruz
    currentDetailedTask.title = newTitle;
    currentDetailedTask.description = newDescription;
    currentDetailedTask.category = newCategory;
    currentDetailedTask.dueDate = newDueDate;
    currentDetailedTask.urgency = newUrgency;
    //görevleri yeniden çiz ki değişiklik yanısısın
    helperRenderTasks(activeMenu);
    taskEditVisualCheck(currentDetailedTask);

    //modal harbiden kapansın
    detailsModalContainer.classList.add("hidden");
    detailsModalContainer.classList.remove("show");
    detailsModalContainer.addEventListener("transitionend", (e) => {
      if (e.target === detailsModalContainer) {
        //edit paneli kapansın!
        detailedModalSwitchStates(false);
      }
    });
  });
};

// bu func sayesinde eğer detailed menüsünde edit menüsü açıldıysa ve kapandıysa tekrar açtığımızda sıfırdan görünüyor
const detailedModalSwitchStates = (state) => {
  const detailLabels = document.querySelectorAll(".details-text");
  const detailInputs = document.querySelectorAll(".details-input");

  if (state) {
    detailLabels.forEach((el) => el.classList.add("display-none"));
    detailInputs.forEach((el) => el.classList.remove("display-none"));

    detailsModalMore.classList.remove("display-none");
    detailsModalMore.classList.remove("d-modal-more-more");

    detailsDeleteButton.classList.add("display-none");
    detailsEditButton.classList.add("display-none");
    detailsEditStateButtonsContainer.classList.remove("out-of-display");
  } else {
    detailLabels.forEach((el) => el.classList.remove("display-none"));
    detailInputs.forEach((el) => el.classList.add("display-none"));

    //detailsModalMore.classList.add("display-none");
    detailsModalMore.classList.add("d-modal-more-more");

    detailsDeleteButton.classList.remove("display-none");
    detailsEditButton.classList.remove("display-none");
    detailsEditStateButtonsContainer.classList.add("out-of-display");
  }
};

//göreve tıkladığımız zaman gelen görevler kısmının içeriğinin görünüp görünmeyeceğini yöneten sınıf!
const showTaskDetails = (task) => {
  detailsModalMore.classList.remove("display-none");
  detailedModalSwitchStates(false);

  currentDetailedTask = task;
  detailsItemTitle.innerText = task.title;
  detailsItemDescription.innerText = task.description;
  if (task.category === "None") {
    detailsItemCategory.classList.add("display-none");
  } else {
    detailsItemCategory.innerText = task.category;
    detailsItemCategory.classList.remove("display-none");
  }
  if (task.dueDate === "") {
    detailsItemDueDate.classList.add("display-none");
  } else {
    detailsItemDueDate.innerHTML = task.dueDate;
    detailsItemDueDate.classList.remove("display-none");
  }
  if (task.urgency === "None") {
    detailsItemUrgency.classList.add("display-none");
    detailsItemUrgency.classList.remove(
      "task-urgency-low",
      "task-urgency-medium",
      "task-urgency-high"
    );
  } else {
    // task urgency'nin seviyelerine göre onu gösteren şeyin arkaplanının rengi değişiyor
    if (task.urgency === "Low") {
      detailsItemUrgency.classList.add("task-urgency-low");
      detailsItemUrgency.classList.remove("task-urgency-medium");
      detailsItemUrgency.classList.remove("task-urgency-high");
    } else if (task.urgency === "Medium") {
      detailsItemUrgency.classList.add("task-urgency-medium");
      detailsItemUrgency.classList.remove("task-urgency-low");
      detailsItemUrgency.classList.remove("task-urgency-high");
    } else if (task.urgency === "High") {
      detailsItemUrgency.classList.add("task-urgency-high");
      detailsItemUrgency.classList.remove("task-urgency-medium");
      detailsItemUrgency.classList.remove("task-urgency-low");
    }
    detailsItemUrgency.innerText = task.urgency;
    detailsItemUrgency.classList.remove("display-none");
  }
  taskEditVisualCheck(task);
};

const taskEditVisualCheck = (task) => {
  if (
    task.category === "None" &&
    task.urgency === "None" &&
    task.dueDate === ""
  ) {
    detailsModalMore.classList.add("display-none");
    detailsItemUrgency.classList.remove(
      "task-urgency-low",
      "task-urgency-medium",
      "task-urgency-high"
    );
  } else {
    detailsModalMore.classList.remove("display-none");
  }
  detailsModalContainer.classList.remove("hidden");
  detailsModalContainer.classList.add("show");
};
let currentDetailedTask = null; //detaylarını açtığımız zaman hangi task olduğunu diğer yerlerden daha rahat anlayabilmemiz için
const addModalReset = () => {
  //modalın kapanma ve sıfırlanma işlemleri
  //modaldaki more options'un sıfırlanması ve scroll'un en başa getirilmesi
  if (!titleEmpty) {
    addModalInternal.scrollTop = 0;
    addMoreOptContainer.classList.add("hidden");
    moreOptSVG.classList.remove("active"); // re-trigger animation
    //diğer yerlerin sıfırlanması
    titleInput.value = "";
    descInput.value = "";
    categorySelect.value = "None";
    dueDateSelect.value = "";
    urgencySelect.value = "None";
    addModal.classList.add("hidden");
    addModal.classList.remove("show");
  }
};

let titleEmpty;
const createTask = (task) => {
  if (task.title === "") {
    titleWarning.innerHTML = "This is a required field.";
    titleInput.classList.add("input-warning");
    titleEmpty = true;
    return;
  } else {
    titleWarning.innerHTML = "";
    titleInput.classList.remove("input-warning");
    titleEmpty = false;
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
  // checkbox hariç taska tıklanınca taskın detaylarını gösterecek menü ortaya çıkacak, ama menünün içeriği diğer fonksiyonda ayarlanacak
  taskDiv.addEventListener("click", (e) => {
    if (!e.target.classList.contains("task-checkbox")) {
      showTaskDetails(task);
    }
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
  //bir de taskı hoverlediğimizde onun yanında çıkan details butonunu ayarlamak lzm, şimdi sıra burada

  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskText);
  //şimdi görevi asıl bütün listeye ekliyoruz görüntüleme olarak
  taskList.appendChild(taskDiv);
};

// helper func for drawing tasks on the screen
const helperRenderTasks = (activeMenu) => {
  taskListEmptyState.classList.add("out-of-display"); //her ihtimale karşı

  taskList.innerHTML = ""; //daha önceden eklenen görevlerin tekrardan ekrana eklenmesini engelliyor
  let filteredTasks = [];
  if (activeMenu === 0) {
    // Eğer şuan All Tasks'ı görüntülüyorsak, ki burada completed'ler olmayacak
    filteredTasks = tasks.filter((task) => !task.checked);
  } else if (activeMenu === 1) {
    //Completed görevler burada görünecek
    filteredTasks = tasks.filter((task) => task.checked); // sadece task.checked olan görevler filteredTasks içine dahil ediliyor
  } // due olan görevler 3. menüde görünecek
  else if (activeMenu === 2) {
    filteredTasks = tasks.filter((task) => {
      const taskDue = new Date(task.dueDate);
      return !task.checked && taskDue < Date.now(); //aynı zamanda mantıken görevin tamamlanmamış da olması gerekiyor
    });
  }
  if (filteredTasks.length !== 0) {
    // eğer listemizde görev varsa o zaman normal şekilde görevler gösterilecek (bu çalışıyor)
    filteredTasks.forEach((task) => renderTask(task));
    hideEmptyState();
  } else if (filteredTasks.length === 0) {
    // ama eğer listede henüz bir görev yoksa bu sefer başka, hiçbir ekranın olmadığına dair bir görev gösterilecek (bu çalışmıyor)
    showEmptyState();
  }
};

// ekran boş iken gösterilmesi için
const showEmptyState = () => {
  taskListEmptyState.style.display = "block";
  void taskListEmptyState.offsetWidth; // reflow tetikleyelim
  taskListEmptyState.classList.remove("out-of-display");
};

const hideEmptyState = () => {
  taskListEmptyState.classList.add("out-of-display");
  taskListEmptyState.addEventListener(
    "transitionend",
    () => {
      taskListEmptyState.style.display = "none";
    },
    { once: true }
  );
};

const menuChangeLogic = () => {
  //şimdi bir de menüler arası geçiş olurken fade in-fade out olacak
  allFilterButton.addEventListener("click", () => {
    activeMenu = 0;
    taskList.classList.remove("fade-in", "fade-out");
    void taskList.offsetWidth; // reflow zorlaması (zorunlu, animasyon tetiklenmesi için)
    taskList.classList.add("fade-out");
    allFilterButton.classList.add("button-active");
    dueFilterButton.classList.remove("button-active");
    completedFilterButton.classList.remove("button-active");
    taskList.addEventListener(
      "transitionend",
      () => {
        helperRenderTasks(activeMenu);
        //bu sefer direk fade-in oluyor
        taskList.classList.remove("fade-out");
        taskList.classList.add("fade-in");
      },
      { once: true }
    );
  });

  completedFilterButton.addEventListener("click", () => {
    activeMenu = 1;
    taskList.classList.remove("fade-in", "fade-out");
    void taskList.offsetWidth; // reflow zorlaması (zorunlu, animasyon tetiklenmesi için)
    taskList.classList.add("fade-out");
    allFilterButton.classList.remove("button-active");
    dueFilterButton.classList.remove("button-active");
    completedFilterButton.classList.add("button-active");
    taskList.addEventListener(
      "transitionend",
      () => {
        helperRenderTasks(activeMenu);
        taskList.classList.remove("fade-out");
        taskList.classList.add("fade-in");
      },
      { once: true }
    );
  });

  dueFilterButton.addEventListener("click", () => {
    activeMenu = 2;
    taskList.classList.remove("fade-in", "fade-out");
    void taskList.offsetWidth; // reflow zorlaması (zorunlu, animasyon tetiklenmesi için)
    taskList.classList.add("fade-out");
    allFilterButton.classList.remove("button-active");
    dueFilterButton.classList.add("button-active");
    completedFilterButton.classList.remove("button-active");
    taskList.addEventListener(
      "transitionend",
      () => {
        helperRenderTasks(activeMenu);
        taskList.classList.remove("fade-out");
        taskList.classList.add("fade-in");
      },
      { once: true }
    );
  });
};

const toggleTaskCompletion = (id, taskDiv) => {
  // task completion olayını tamamen burada yapacağız
  let targetTask = tasks.find((task) => task.id === id);
  if (targetTask) {
    targetTask.checked = !targetTask.checked; // eğer checked ise unchecked yap, yani toggle
    //burada fade out animasyonunu yapacağız, bütün menüler için geçerli olacak çünkü uncheck yaparsak da aynı şey olmalı, her türlü güzel gözükmeli yani
    if (targetTask.checked) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    taskDiv.classList.add("fade-out-task"); // taskımızı fade out yapan sınıfı ekliyoruz task'a
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
//buraya fast task ekleme olayını yapıcaz ve keypress eventi eklicez!
fastTaskAdd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // inputtaki değerin boş olmaması lzm
    const inputValue = fastTaskAdd.value.trim();
    const id = crypto.randomUUID();

    if (inputValue === "") return;
    //diğer modalların da kapalı olması lzm
    const isDetailsModalOpen =
      !detailsModalContainer.classList.contains("hidden");
    const isAddModalOpen = !addModal.classList.contains("hidden");
    if (!isDetailsModalOpen && !isAddModalOpen) {
      const newFastTask = {
        id: id,
        title: inputValue,
        description: "",
        category: "None",
        dueDate: "",
        urgency: "None",
        checked: false,
      };

      createTask(newFastTask);
      fastTaskAdd.value = ""; // input’u temizle
    } else {
      console.log("DEBUG: Modals should be closed!");
    }
  }
});

detailedModalFunctionality();
addModalFunctionality();
menuChangeLogic();
helperRenderTasks(activeMenu);
