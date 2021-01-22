import { LightningElement } from 'lwc';

export default class Kata extends LightningElement {

    itemsValueMediaFragment = "List Value";

    get firstItemsArray() { 
        const valueOrdinalPrefix = "First";
        return [
            {guid: "1", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 1}, 
            {guid: "2", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 2}, 
            {guid: "3", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 3}
        ];
    } 
    get secondItemsArray() {
        const valueOrdinalPrefix = "Second";
        return [
            {guid: "4", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 1}, 
            {guid: "5", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 2}, 
            {guid: "6", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 3}
        ];
    }

}