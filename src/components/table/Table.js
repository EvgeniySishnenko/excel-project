import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shootResize, isSell, matrix, nextSelection} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root){
    super($root, {
      listeners: ['mousedown', 'dragstart', 'keydown'],
    });
  }

  toHTML() {
    return createTable(20);
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init(){
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.selected($cell);
  }
  onMousedown(){
    if(shootResize(event)){
      resizeHandler(this.$root, event);
    }else if(isSell(event)){
      const $target = $(event.target);
      if(event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectedGroup($cells);
      }else {
        this.selection.selected($target);
      }
    }
  }
  onKeydown(){
  const keys = ['Tab', 'Enter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
  const {key} = event;
  if(keys.includes(key) && !event.shiftKey){
    event.preventDefault();
    const id = this.selection.current.id(true);
    const $next = this.$root.find(nextSelection(key, id));
    this.selection.selected($next);
  }
  }
  onDragstart(){
   event.preventDefault();
  }
}
