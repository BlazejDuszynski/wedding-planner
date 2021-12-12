{
    const tasks = [];

    const AddNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done
    }

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

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item">
                <button class="tasks__button tasks__button--done">
                ${task.done ? "✔️" : ""}
                </button>
                <span 
                class="task"${task.done ? "task--done" : ""}"
                >${task.content}</span>
                <button class="tasks__button tasks__button--remove">🗑</button>
            </li>
            `;
        }

        document.querySelector(".tasks").innerHTML = htmlString

        bindEvents();
    };

    const init = () => {
        render();

        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js__newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            AddNewTask(newTaskContent);
            render();
        })
    };

    init();
}