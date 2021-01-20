import { LightningElement, api } from 'lwc';

export default class ListOfDragAndDroppableItems extends LightningElement {

    @api
    label;

    @api
    items;

    handleDragStart(event) { 
        event.dataTransfer.setData("itemId", event.target.dataset.item); 
        event.dataTransfer.setData("itemValue", event.target.innerText); 
    } 
    handleDragOver(event) { 
        event.preventDefault(); 
    } 
    handleDrop(event) {

        event.preventDefault();

        const itemId = event.dataTransfer.getData("itemId"); 
        console.log("handleDrop() is being executed");
        this.items.push({guid: itemId, value: event.dataTransfer.getData("itemValue")}); 
        console.log("items: " + JSON.stringify(this.items));

    }

}