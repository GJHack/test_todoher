import {localRead, localWrite, localAll, localRemove} from "./localWorker.js"
/**
 * @description Сделал тут своебразный мидлварь перед работой с локалем. Допустим, на будущее.
 */



/**
 * 
 * @param {TaskObject} task 
 * @returns 
 */
export function setTask (key = "", task = {}, drawTasks = f => f) {

    try {

        if(!key || typeof key != "string") throw "Ключ должен быть строкой";
        if(!task || typeof task != "object") throw "ошибка. не передан объект таски";

        localWrite(key, task);

    } catch(e) {

        console.error("при получении таски возникла ошибка", e);

    } finally {

        drawTasks();

    }

}

/**
 * 
 * @param {int} index 
 * @returns 
 */
export function getTask (index = -3) {

    try {

        if(index === -3) throw "Ошибка. Не передан индекс таски";

    } catch(e) {

        console.error("при получении таски возникла ошибка", e);

    } finally {

        return;

    }
   
}

/**
 * 
 * @param {int} index 
 * @returns 
 */
export function allTasks () {

    const tasks = localAll();

    try {

        console.log(tasks);

    } catch(e) {

        console.error("при получении таски возникла ошибка", e);

    } finally {

        return tasks;

    }

}

export function removeTask(key = "", drawTasks = f => f) {

    try {

        if(!key || typeof key != "string") throw "Ключ должен быть строкой";

        localRemove(key);

    }catch(e) {

        console.log(e);

        return false;

    } finally {

        drawTasks();

    }

}


export function makeTask(inputsList = [], drawTasks = f => f) {

    try {

        const task = new Object({});

        for(let input of inputsList) {

            if(!input.value && input.type != "hidden") {
                input.placeholder = `заполни данные для ${input.name}`;
                return;
            } else if(input.type == "hidden") {
                continue;
            }

            task[input.name] = input.value;

            console.log(task)
        }
    
        task.status = "в процессе"
        
        const key = `${localStorage.length}`;
    
        setTask(key, task)

    } catch(e) {

        console.log(e);

        return false;

    } finally {

        for(let input of inputsList) {
            input.value = "";
        }

        drawTasks();

    }
}