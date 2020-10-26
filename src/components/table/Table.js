import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shootResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root){
    super($root, {
      listeners: ['mousedown', 'dragstart'],
    });
  }

  toHTML() {
    return createTable(20);
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init(){
    console.log('init');

    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.selected($cell);
  }
  onMousedown(){
    if(shootResize(event)){
      resizeHandler(this.$root, event);
    }
  }
  onDragstart(){
   event.preventDefault();
  }
}

