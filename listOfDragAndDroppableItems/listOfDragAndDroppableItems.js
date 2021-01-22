import { LightningElement, api, track } from 'lwc';

import { createMessageContext, releaseMessageContext, publish, subscribe } from 'lightning/messageService'; 
import DragAndDropMessageChannel from "@salesforce/messageChannel/DragAndDropMessageChannel__c";

export default class ListOfDragAndDroppableItems extends LightningElement {

    messageContext = createMessageContext(); 
    subscription = null;

    dragAndDroppedItemGuid; 
    dragAndDroppedItemValue;

    constructor() {

        super();

        if (this.subscription) { 
            return; 
        } 
        this.subscription = subscribe(this.messageContext, DragAndDropMessageChannel, (dragAndDropMessage) => {

            if (
                !dragAndDropMessage.isItemUpcomingToBeDropped && 
                this.guid !== dragAndDropMessage.listGuid // a little duck tape here
            ) {

                this.listElements = this.listElements.filter(({guid}) => guid != dragAndDropMessage.itemGuid);

            } 
            else {
                this.dragAndDroppedItemGuid = dragAndDropMessage.itemGuid; 
                this.dragAndDroppedItemValue = dragAndDropMessage.itemValue; 
            } 
        }); 
    }

    @api
    guid;

    @api
    label;

    @track
    listElements;
    @api
    get items() {
        return this.listElements;
    }
    set items(value) {
        this.listElements = value;
    }

    handleDragStart(event) { 
        const dragAndDropMessage = { 
            itemGuid: event.target.dataset.item, 
            itemValue: event.target.innerText, 
            isItemUpcomingToBeDropped: true
        }; 
        publish(this.messageContext, DragAndDropMessageChannel, dragAndDropMessage); 
    } 
    handleDragOver(event) { 
        event.preventDefault(); 
    } 
    handleDrop(event) {
        console.log("handleDrop() is being executed"); 
        event.preventDefault(); 
        console.log("listElements before an adding of a dropped item: " + JSON.stringify(this.listElements)); 
        this.listElements = [...this.listElements, {guid: this.dragAndDroppedItemGuid, value: this.dragAndDroppedItemValue}];
        console.log("listElements after the adding of the dropped item: " + JSON.stringify(this.listElements)); 
        const dragAndDropMessage = { 
            listGuid: this.guid, 
            itemGuid: this.dragAndDroppedItemGuid, 
            itemValue: null, 
            isItemUpcomingToBeDropped: false 
        }; 
        console.log("dragAndDropMessage in drop handling: " + JSON.stringify(dragAndDropMessage)); 
        publish(this.messageContext, DragAndDropMessageChannel, dragAndDropMessage);

    }

    disconnectedCallback() { 
        releaseMessageContext(this.messageContext); 
    }

}