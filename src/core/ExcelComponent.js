import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
    this.emmiter = options.emmiter;
    this.unsubscribers = [];
  }
  // настраивает наш компонент до init
  prepare(){
  }
  // Возвращает шаблон компонента
  toHTML() {
    return "";
  }
  // Уведомляем слушателей про события event
  $emit(event, ...args){
    this.emmiter.emit(event, ...args);
  }
  // подписываемся на события Event
  $on(event, fn){
    const unsub = this.emmiter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  // иницилиазирует компонент
  // Добавляем Dom слушателей
  init() {
    this.initDOMListeners();
  }
  // Удаляем компонент
  // Чистим Dom слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
