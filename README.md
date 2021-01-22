# LWC component: List of drag-and-droppable items
A training kata to acquire Lightning Web Components knowledge

For valid functioning of the developed LWC component you need to create a specific **DragAndDropMessageChannel.messageChannel-meta.xml** in your project.<br>

Check the article with the corresponding basics: _https://niksdeveloper.com/salesforce/lightning-message-service-future-of-communication/_<br>

DragAndDropMessageChannel.messageChannel-meta.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
	<masterLabel>DragAndDropMessageChannel</masterLabel>
	<isExposed>true</isExposed>
	<description>The Message Channel to implement drag-and-drop functionality between LWC components</description>
</LightningMessageChannel>
