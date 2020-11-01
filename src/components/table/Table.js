import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shootResize, isSell, matrix, nextSelection} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options){
    super($root, {
      listeners: ['mousedown', 'dragstart', 'keydown', 'input'],
      ...options,
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
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on("formula:done", ()=>{
      this.selection.current.focus();
    });
  }
  selectCell($cell){
    this.selection.selected($cell);
    this.$emit('table:select', $cell);
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
    this.selectCell($next);
  }
  // if(event.shiftKey && event.key === 'Enter') {
  //   event.preventDefault();
  //   const focus = this.selection.current.focus();
  //   this.$emit('table:focus', focus);
  // }
  }
  onInput(event){
    this.$emit('table:input', $(event.target));
  }
  onDragstart(){
   event.preventDefault();
  }
}
