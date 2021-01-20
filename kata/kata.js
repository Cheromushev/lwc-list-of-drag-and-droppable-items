import { LightningElement } from 'lwc';

export default class Kata extends LightningElement {

    itemsValueMediaFragment = "List Value";

    get firstItemsArray() { 
        const valueOrdinalPrefix = "First";
        return [
            {guid: "001", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 1}, 
            {guid: "010", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 2}, 
            {guid: "011", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 3}
        ];
    } 
    get secondItemsArray() {
        const valueOrdinalPrefix = "Second";
        return [
            {guid: "100", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 1}, 
            {guid: "101", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 2}, 
            {guid: "110", value: valueOrdinalPrefix + "\u0020" + this.itemsValueMediaFragment + "\u0020" + 3}
        ];
    }

}