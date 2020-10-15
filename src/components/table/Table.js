import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
let isMousedown = null;
let currentDrag = {};
function getCurrentZone(from, to) {
  do {
      if (from.classList.contains(to)) {
          return from;
      }
  } while (from = from.parentElement);

  return null;
}

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root){
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup', 'dragstart'],
    });
  }

  toHTML() {
    return createTable(20);
  }
  onMousedown(){
    if(event.target.dataset.resize){
      const zone = getCurrentZone(event.target, 'js-drop-zone');

      isMousedown = event.target.dataset.resize;
      currentDrag = {node: event.target, startZone: zone, startX: event.pageX};
    }
  }
  onMousemove(){
    if(isMousedown && event.which === 1){
      const zone = getCurrentZone(event.target, 'js-drop-zone');
      if (!zone) return;
      currentDrag = {...currentDrag, finishX: event.pageX };
      const $el = currentDrag.node;
      const moveX = event.pageX - currentDrag.startX;
      const $startZone = currentDrag.startZone;
      const offsetWidth = $startZone.offsetWidth;
      // console.log(event.pageX, currentDrag.startX, moveX);
      $el.style.zIndex = 1000;
      $el.style.opacity = 1;
      $el.style.left = offsetWidth + moveX + 'px';
      console.log(event.pageX);
    }
  }
  onMouseup(){
    if (!currentDrag ) return;
    const $startZone = currentDrag.startZone;
    const offsetWidth = $startZone.offsetWidth;
    const moveX = event.pageX - currentDrag.startX;
    $startZone.style.width = offsetWidth + moveX+ 'px';
  }
  onDragstart(){
    event.preventDefault();
  }
}
