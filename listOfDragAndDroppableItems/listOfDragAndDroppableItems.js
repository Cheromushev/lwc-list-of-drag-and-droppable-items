import { LightningElement, api } from 'lwc';

export default class ListOfDragAndDroppableItems extends LightningElement {

    @api
    label;

    @api
    items;

}