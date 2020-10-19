import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shootResize} from './table.functions';
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
  onMousedown(){
    if(shootResize(event)){
      resizeHandler(this.$root, event);
    }
  }
  onDragstart(){
   event.preventDefault();
  }
}

