import {
    setTask, 
    getTask, 
    allTasks, 
    makeTask as make,
    removeTask
} from "./toDoher.js"

try {

    console.log("скрипт начал работу...");

    if(!window) throw "нет объекта окна";

    window.addEventListener("DOMContentLoaded", () => {

        //динамические элементы
        const tasksContainer = document.querySelector('#ids_container_toDoes');  

        //кнопки
        const btnAdd = document.querySelector('#ids_addToDo'); 
        
        drawTasks(allTasks(), tasksContainer);

        //Вешаем слушатели на все что нужно
        btnAdd.addEventListener('click', function(evt) {

            evt.preventDefault();
            make(Array.from(this.parentNode.querySelectorAll('input')), () => {drawTasks(allTasks(), tasksContainer)});

        })

        console.log("DOM загружен. Начало работы....");
        console.log("скрипт удачно загружен и работает.");
    })

} catch(e) {

    console.error("ТОТАЛЬНАЯ ОШИБКА. РАБОТА СКРИПТА НЕВОЗМОЖНА \n", e);

} 


function drawTasks(tasks = [], container){

    if(typeof tasks[0] == "undefined")

        container.innerHTML = "<h3>Сорянчик, ты бездельник</h3>";

    else 
        container.innerHTML = "";

        tasks.forEach( (it, index) => {
            
            const item = JSON.parse(it.item);

            container.innerHTML += `
                <article class = "${"block_toDo"} ${(item.status == "в процессе") ? "active_toDo" : "deactive_toDo"}">
                    <h3>${item.name}</h3>
                    <p>${item.text}</p>
                    <button id = "ids_btnStatus_${index}" class = "${'statusButton'}" data-status = "${item.status}" data-key = "${it.key}">${item.status}</button>
                    <button id = "ids_btnRemove_${index}" class = "${'removeButton'}" data-key = "${it.key}">удалить</button>
                </article>
            `;

        })

        //обработка событий
        taskEvents(tasks, container);
        
}

/**
 * @description просто убрал для красоты в отдельную функцию
 * @param {ArrayTasks} tasks
 * @param {DOMElement} container 
 */
function taskEvents(tasks = [], container = {}) {

    const statusButtons = document.querySelectorAll(`button.statusButton`);
    const removeButtons = document.querySelectorAll(`button.removeButton`);

    statusButtons.forEach( (item, index) => {

        item.addEventListener('click', (evt) => {

            const status = evt.target.dataset.status;
            const parseItem = JSON.parse(tasks[index].item)
            const key = tasks[index].key;

            switch(status) {

                case "в процессе":
                    evt.target.dataset.status = "Завершено";
                    evt.target.innerText = "Завершено";
                    parseItem.status = "Завершено";
                    break;
                case "Завершено":
                    evt.target.dataset.status = "в процессе";
                    evt.target.innerText = "в процессе";
                    parseItem.status = "в процессе";
                    break;    
                default: 
                    evt.target.dataset.status = "в процессе";
                    evt.target.innerText = "в процессе";   
                    parseItem.status = "в процессе";

            }

            setTask(key, parseItem, () => {drawTasks(allTasks(), container)})

        })

    })

    removeButtons.forEach( (item, index) => {

        item.addEventListener('click', (evt) => {

            const key = evt.target.dataset.key;

            removeTask(key, () => {drawTasks(allTasks(), container)})

        })

    })

}


/* Template HTML

            <article class = "block_toDo">

            </article>
    
*/