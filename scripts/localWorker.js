console.log("скрипт localWorkers подключен");

/**
 * @name localRead
 * @description Простая функция для чтения с local storage
 */
export function localRead (key = "") {

    const result = new Object({}),
          store = localStorage;

    try {

        if(!key || typeof key != "string") throw "Ключ должен быть строкой";

    } catch (e) {

        console.log("ошибка чтения из LocalStorage: \n", e)

    } finally {
     
        return local;

    }
}

/**
 * @name localWrite
 * @description Простая функция для чтения с local storage
 * @param {UserObject} data 
 * @returns 
 */
export function localWrite (key = "", data = {}) {

    const store = localStorage,
          length = store.length;

    try {

        if(!key || typeof key != "string") throw "Ключ должен быть строкой";
        if(!data || typeof data != "object") throw "данные для записи должны быть объектом JSON";

        for(const [key, value] in data){
            if(typeof value == "undefind") throw `-> не передан необходимый аргумент ${key}: ${value}`;
        }

        const JSONdata = JSON.stringify(data);
   
        store.setItem(key, JSONdata);
        
        console.log(`Результат записи: `, true);

    } catch (e) {

        console.log("ошибка записи в LocalStorage: \n", e)

    } 

}

/**
 * @name localRemove
 * @description Простая функция для чтения с local storage
 * @param {string} key 
 * @returns 
 */
export function localRemove (key = "") {

    const store = localStorage;

    try {

        if(!key || typeof key != "string") throw "Ключ должен быть строкой";

        store.removeItem(key);
        
        console.log(`Результат удаления: `, true);

    } catch (e) {

        console.log("ошибка удаления в LocalStorage: \n", e)

    } 

}


/**
 * @name localAll
 * @description внутренняя функция для чека local storage
 */
export function localAll() {

    const result = new Array(),
    store = localStorage,
    length = store.length;

    try {

        for(let i = 0; i < length; i++) {

        const key = store.key(i),
            item = store.getItem(key)

            result.push({key: key, item: item});      
        }    

    } catch (e) {

        console.log("ошибка чтения из LocalStorage: \n", e)

    } finally {
     
        return result;

    }

}