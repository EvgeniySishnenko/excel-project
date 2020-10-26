import {$} from '@core/dom';

export class TableSelection {
    constructor(){
        this.group = [];
    }
    // $el instanceof DOM === true
    selected($el){
       this.group.push($el);
       $el.addClass('selected');
    }
    selectedGroup(){
    }
}
