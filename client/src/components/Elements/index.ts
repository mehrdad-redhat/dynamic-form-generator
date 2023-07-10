import {RefObject} from "react";

export {TextEl} from './TextEl';
export {CheckboxEl} from './CheckboxEl';
export {SelectEl} from './SelectEl';
export {RadioEl} from './RadioEl';

export type ElementProps = {
	elIndex: number,
	formRef: RefObject<HTMLFormElement>,
	onRemove?:(index: number)=>void
}
