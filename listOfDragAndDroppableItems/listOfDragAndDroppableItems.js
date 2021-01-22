import { LightningElement, api, track } from 'lwc';

import { createMessageContext, releaseMessageContext, publish, subscribe } from 'lightning/messageService'; 
import DragAndDropMessageChannel from "@salesforce/messageChannel/DragAndDropMessageChannel__c";

export default class ListOfDragAndDroppableItems extends LightningElement {

    messageContext = createMessageContext(); 
    subscription = null;

    dragAndDroppedItemGuid; 
    dragAndDroppedItemValue;

    isItemHome = false;

    constructor() {

        super();

        if (this.subscription) { 
            return; 
        } 
        this.subscription = subscribe(this.messageContext, DragAndDropMessageChannel, (dragAndDropMessage) => {

            if (!dragAndDropMessage.isItemUpcomingToBeDropped) {

                this.isItemHome = false;

                if (this.guid !== dragAndDropMessage.listGuid) { // a little duck tape here
                    this.listElements = this.listElements.filter(({guid}) => guid != dragAndDropMessage.itemGuid); 
                }

            } else { 
                if (this.guid === dragAndDropMessage.listGuid) { // a little duck tape here
                    this.isItemHome = true; 
                } else { 
                    this.dragAndDroppedItemGuid = dragAndDropMessage.itemGuid; 
                    this.dragAndDroppedItemValue = dragAndDropMessage.itemValue; 
                } 
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
            listGuid: this.guid, 
            itemGuid: event.target.dataset.item, 
            itemValue: event.target.innerText, 
            isItemUpcomingToBeDropped: true
        }; 
        publish(this.messageContext, DragAndDropMessageChannel, dragAndDropMessage); 
    } 
    handleDragOver(event) { 
        if (!this.isItemHome) { 
            event.preventDefault(); 
        } 
    } 
    handleDrop(event) {

        event.preventDefault();

        this.listElements = [...this.listElements, {guid: this.dragAndDroppedItemGuid, value: this.dragAndDroppedItemValue}];

        const dragAndDropMessage = { 
            listGuid: this.guid, 
            itemGuid: this.dragAndDroppedItemGuid, 
            itemValue: null, 
            isItemUpcomingToBeDropped: false 
        }; 
        publish(this.messageContext, DragAndDropMessageChannel, dragAndDropMessage);

    }

    handleClick(event) {
        this.listElements = this.listElements.filter(({guid}) => guid != event.target.dataset.item);
    }

    disconnectedCallback() { 
        releaseMessageContext(this.messageContext); 
    }

}