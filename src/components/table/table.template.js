const CODES = {
    A: 65,
    Z: 90,
};
function toCell(_, coll){
    return `<div class="cell" data-coll="${coll}" contenteditable></div>`;
}
function toColumn(col, index){
    return `<div class="column" data-type="resizable" data-coll="${index}">
    ${col}
    <div data-resize="col" class="col-resize" ></div>
    </div>`;
}
function createRow(index, content){
    const resize = index ? '<div data-resize="row" class="row-resize"></div>' : '';
    return `
    <div class="row" data-type="resizable">
    <div class="row-info" >
    ${index ? index : ''}
    ${resize}
    </div>
    <div class="row-data ">${content}</div>
    </div>
    `;
}
function toChar(_, index){
    return String.fromCharCode(CODES.A + index);
}
export function createTable(rowsCount = 15){
    const colsCount = CODES.Z - CODES.A + 1;
    const rows =[];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');
    rows.push(createRow(null, cols));
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    for(let i = 0; i < rowsCount; i++){
        rows.push(createRow(i+1, cells));
    }
    return rows.join('');
}
