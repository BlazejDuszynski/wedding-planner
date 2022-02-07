{
    let tasks = [];
    let HideDoneTasks = false;

    const AddNewTask = (newTaskContent) => {

        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    }

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) => (taskIndex === index) ? ({ ...task, done: !task.done }) : ({ ...task }));

        render();

    };

    const toggleTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };


    const toggleHideTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".tasks__button--remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".tasks__button--done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (task of tasks) {
            htmlString += `
            <li class="tasks__item">
                <button class="tasks__button tasks__button--done">
                ${task.done ? "" : ""}
                </button>
                <span 
                class="${task.done ? "task--done" : ""}">
                ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove">🗑</button>
            </li>
            `;
        };

        document.querySelector(".tasks").innerHTML = htmlString
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

    const renderButtons = () => {
        buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }
        buttonsElement.innerHTML = `
            <button class="section__buttons js-toggleAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
            <button class="section__buttons js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            `;
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneTasks = document.querySelector(".js-toggleHideDoneTasks");
        const toggleAllTasksDone = document.querySelector(".js-toggleAllTasksDone");

        if(toggleHideDoneTasks && toggleAllTasksDone) {
            toggleHideDoneTasks.addEventListener("click", toggleHideTasksDone);
            toggleAllTasksDone.addEventListener("click", toggleTasksDone);
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js__newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        AddNewTask(newTaskContent);
    };

    const init = () => {

        render();

        const form = document.querySelector(".form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}