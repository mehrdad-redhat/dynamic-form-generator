import {ElementType} from "../models";
import React, {RefObject, useRef} from "react";
import styled from "@emotion/styled";
import {Button, PlusIcon, TextInputField} from "evergreen-ui";
import {CheckboxEl, RadioEl, SelectEl, TextEl} from "./Elements";
import {ElementBox} from "./ElementBox";
import {Swatch} from "../theme";
import {SubmitHandler, useForm} from "react-hook-form";
import {usePageEditMutation, useSinglePageQuery} from "../routes/page";

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 12px;
  overflow: auto;
  padding: 0 12px 12px 12px;
`

const EmptyBox = styled(ElementBox)`
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #a3a3a3;
  font-style: italic;
  height: 70px;
`
const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 12px;

  #text {
    background-color: ${Swatch.textElementColor};
  }

  #check {
    background-color: ${Swatch.checkElementColor};
  }

  #select {
    background-color: ${Swatch.selectElementColor};
  }

  #radio {
    background-color: ${Swatch.radioElementColor};
  }
`

const switchElement = (elementType: ElementType, elName: string, index: number, formRef, onRemove) => {
	switch (elementType) {
		case ElementType.TEXT:
			return <TextEl key={`${index}${elName}`}
			               onRemove={onRemove}
			               elIndex={index} formRef={formRef}/>
		case ElementType.CHECKBOX:
			return <CheckboxEl key={`${index}${elName}`}
			                   onRemove={onRemove}
			                   elIndex={index} formRef={formRef}/>
		case ElementType.SELECT:
			return <SelectEl key={`${index}${elName}`}
			                 onRemove={onRemove}
			                 elIndex={index} formRef={formRef}/>
		case ElementType.RADIO:
			return <RadioEl key={`${index}${elName}`}
			                onRemove={onRemove}
			                elIndex={index} formRef={formRef}/>

	}
}

export interface ElementsEditForm {
	name?: string;

	[key: string]: string | boolean;
}

type EditProps = { formRef: RefObject<HTMLFormElement> }

const Edit: React.FC<EditProps> = ({formRef}) => {
	const {data: page} = useSinglePageQuery()
	const {mutateAsync: edit,} = usePageEditMutation();
	const buttonGroupRef = useRef<HTMLDivElement>(null);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ElementsEditForm>({
		defaultValues: page.elements.reduce((a, v, i) => ({...a, ['input' + i]: v.name}), {name: page.name})
	});

	const editPage: SubmitHandler<ElementsEditForm> = (data) => {
		edit({...page, name: data.name}).then()
	}

	const addElement = (type: ElementType) => {
		switch (type) {
			case ElementType.TEXT:
				page.elements.push({
					name: 'new-text-element',
					type: ElementType.TEXT,
				})
				break;
			case ElementType.CHECKBOX:
				page.elements.push({
					name: 'new-checkbox-element',
					type: ElementType.CHECKBOX,
				})
				break;
			case ElementType.SELECT:
				page.elements.push({
					name: 'new-select-element',
					type: ElementType.SELECT,
					choices: []
				})
				break;
			case ElementType.RADIO:
				page.elements.push({
					name: 'new-radio-element',
					type: ElementType.RADIO,
					choices: ['default option']
				})
				break;
			default:
				throw new Error('Wrong type')
		}
		console.log(formRef)
		edit({...page}).then(() => {
			if (formRef)
				formRef.current.scroll({
					top: formRef.current.scrollHeight,
					behavior: "smooth",
				})
			console.log(buttonGroupRef)
			if (buttonGroupRef.current)
				buttonGroupRef.current.scrollIntoView({behavior: 'smooth'});
		})

	}

	const onRemove = (index: number) => {
		if (window.confirm(`Are you sure you want to remove text field {${page.elements[index].name}} ?`)) {
			const tempPageElements = [...page.elements];
			tempPageElements.splice(index, 1);
			edit({...page, elements: tempPageElements}).then()
		}
	}

	return (
		<FormContainer>
			<form onSubmit={handleSubmit(editPage)}>
				<TextInputField
					{...register('name', {required: 'name is required!'})}
					isInvalid={!!errors!.name}
					validationMessage={errors!.name?.message}
					label="Page Name"
					marginBottom={0}
					style={{width: 'auto'}}
				/>
			</form>

			{
				page.elements.length === 0 ?
					<EmptyBox>There isn't any elements!</EmptyBox> :
					page.elements.map((el, index) =>
						switchElement(el.type, el.name, index, formRef, onRemove)
					)
			}
			<ButtonGroup ref={buttonGroupRef}>
				<Button iconBefore={PlusIcon}
				        onClick={() => addElement(ElementType.TEXT)}
				        id="text">Text Field</Button>
				<Button iconBefore={PlusIcon}
				        onClick={() => addElement(ElementType.CHECKBOX)}
				        id="check">Checkbox</Button>
				<Button iconBefore={PlusIcon}
				        onClick={() => addElement(ElementType.SELECT)}
				        id="select">Select Box</Button>
				<Button iconBefore={PlusIcon}
				        onClick={() => addElement(ElementType.RADIO)}
				        id="radio">Radio Group</Button>
			</ButtonGroup>
		</FormContainer>
	)
}

export default Edit;
