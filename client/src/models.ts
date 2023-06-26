export enum ElementType {
	TEXT = "text",
	CHECKBOX="checkbox",
	SELECT="select",
	RADIO="radio"
}
export interface Element{
	type: ElementType,
	name: string,
	choices?: string[],
	requiredIf?: string,
	visibleIf?: string,
	editableIf?: string,
}

export interface Page{
	id: string,
	name: string,
	elements: Element[],
}
