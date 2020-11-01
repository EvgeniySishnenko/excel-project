export class Emmiter{
    constructor(){
        this.listeners = {};
    }
    // dispatch, fire, trigger
    // уведомляем слушатели если они есть
    // table.emit('table:select', {a:1})
    emit(event, ...args){
        if(!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        });
        return true;
    }
    // on listener
    // Подписываемся на уведомления
    // Добавляем нового слушателя
    // formuls.subscribe('table:selection', ()=> {})
    subscribe(event, fn){
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);

        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn);
        };
    }
}
// Example
// const emmiter = new Emmiter();
// const unsub = emmiter.subscribe('evgeniy', data => console.log('Sub', data));
// emmiter.emit('e213vgeniy', 42);

// emmiter.emit('evgeniy', 42);
// unsub();
// emmiter.emit('evgeniy', 42);
