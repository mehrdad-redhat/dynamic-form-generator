export enum ElementType {
	TEXT = "text",
	CHECKBOX = "checkbox",
	SELECT = "select",
	RADIO = "radio"
}

export interface Condition {
	elementName: string;
	valueToPass: string;
}

export interface Element {
	type: ElementType,
	name: string,
	choices?: string[],
	requiredIf?: Condition[],
	visibleIf?: Condition[],
	editableIf?: Condition[],
}

export interface Page {
	readonly _id: string,
	readonly owner?: string,
	name: string,
	elements: Element[],
}

export interface User {
	readonly _id: string,
	name: string,
}


export enum ConditionType {
	REQUIRED = 'requiredIf',
	VISIBLE = 'visibleIf',
	EDITABLE = 'editableIf',
}
