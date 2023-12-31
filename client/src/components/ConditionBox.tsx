import {Condition, ConditionType, ElementType} from "../models";
import {usePageEditMutation, useSinglePageQuery} from "../routes/page";
import React from "react";
import styled from "@emotion/styled";
import {ConditionTypeFrame} from "./ConditionTypeFrame";
import {IconButton, SelectField, TextInputField, TrashIcon} from "evergreen-ui";
import {Controller, useFieldArray, useForm} from "react-hook-form";

type ConditionForm = {
	requiredIf: Condition[],
	visibleIf: Condition[],
	editableIf: Condition[],
}

type ConditionBoxProps = {
	elIndex: number
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  padding-top: 12px;
`

export const ConditionBox: React.FC<ConditionBoxProps> = ({elIndex}) => {

	const {data: page} = useSinglePageQuery()
	const {mutate: updatePage} = usePageEditMutation();
	const element = page.elements[elIndex];
	const elementsNameList = page.elements.flatMap(e => e.name === element.name ? [] : e.name);
	const {
		control,
		handleSubmit,
		getValues,
		setValue,
	} = useForm<ConditionForm>({
		defaultValues: {
			requiredIf: element.requiredIf || [],
			visibleIf: element.visibleIf || [],
			editableIf: element.editableIf || [],
		}, mode: 'all'
	});
	const {fields: requiredFileds, append: requiredAppend, remove: requiredRemove} = useFieldArray({
		name: "requiredIf",
		control
	});
	const {fields: visibleFileds, append: visibleAppend, remove: visibleRemove} = useFieldArray({
		name: "visibleIf",
		control
	});
	const {fields: editableFileds, append: editableAppend, remove: editableRemove} = useFieldArray({
		name: "editableIf",
		control
	});
	const onSubmit = (data: ConditionForm) => {
		page.elements[elIndex] = {...page.elements[elIndex], ...data};
		updatePage({...page})
	}

	return (
		<FormContainer onClick={e => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
			{
				element.type === ElementType.TEXT &&
				<ConditionTypeFrame cType={ConditionType.REQUIRED}
				                    elType={element.type}
				                    onAdd={() => requiredAppend({elementName: elementsNameList[0], valueToPass: ''})}>
					{requiredFileds.map((field, index) => <ConditionElement key={field.id + 'requ'}
					                                                        cType={ConditionType.REQUIRED}
					                                                        {...{control, index, field}}
					                                                        onRemove={() => {
						                                                        requiredRemove(index);
						                                                        onSubmit(getValues())
					                                                        }}
					                                                        onChange={(v) => {
						                                                        if (v)
							                                                        setValue(`requiredIf.${index}.elementName`, v)
						                                                        onSubmit(getValues())
					                                                        }}
					                                                        elNameList={elementsNameList}/>)}
				</ConditionTypeFrame>
			}
			<ConditionTypeFrame cType={ConditionType.VISIBLE}
			                    elType={element.type}
			                    onAdd={() => visibleAppend({elementName: elementsNameList[0], valueToPass: ''})}>
				{visibleFileds.map((field, index) => <ConditionElement key={field.id + 'visible'}
				                                                       cType={ConditionType.VISIBLE}
				                                                       {...{control, index, field}}
				                                                       onRemove={() => {
					                                                       visibleRemove(index);
					                                                       onSubmit(getValues())
				                                                       }}
				                                                       onChange={(v) => {
					                                                       if (v)
						                                                       setValue(`visibleIf.${index}.elementName`, v)
					                                                       onSubmit(getValues())
				                                                       }}
				                                                       elNameList={elementsNameList}/>)}
			</ConditionTypeFrame>
			<ConditionTypeFrame cType={ConditionType.EDITABLE}
			                    elType={element.type}
			                    onAdd={() => editableAppend({elementName: elementsNameList[0], valueToPass: ''})}>
				{editableFileds.map((field, index) => <ConditionElement key={field.id + "edit"}
				                                                        cType={ConditionType.EDITABLE}
				                                                        {...{control, index, field}}
				                                                        onRemove={() => {
					                                                        editableRemove(index);
					                                                        onSubmit(getValues())
				                                                        }}
				                                                        onChange={(v) => {
					                                                        if (v)
						                                                        setValue(`editableIf.${index}.elementName`, v)
					                                                        onSubmit(getValues())
				                                                        }}
				                                                        elNameList={elementsNameList}/>)}
			</ConditionTypeFrame>
		</FormContainer>
	)
}

const ConditionElementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #c9c9c9;
  padding: 6px;
  column-gap: 4px;
  position: relative;

  &:hover > button {
    display: flex;
  }

  button {
    position: absolute;
    top: -6px;
    right: 36px;
    display: none;
  }

  div:has(.custom-select) {
    margin-bottom: 0;
    flex: 1;
  }

  div:has(+ .custom-select) {
    margin-bottom: 2px !important;
  }

  .sign {
    width: 30px;
    text-align: center;
  }

  label {
    font-size: 12px;
    white-space: nowrap;
  }
`

type ConditionElementProps = {
	elNameList: string[],
	onRemove: () => void,
	onChange: (value?: string) => void,
	cType: ConditionType,
	control, index, field
}

const ConditionElement: React.FC<ConditionElementProps> = ({
	                                                           cType,
	                                                           elNameList,
	                                                           onRemove,
	                                                           control,
	                                                           index,
	                                                           field,
	                                                           onChange
                                                           }) => {
	return <ConditionElementContainer>
		<IconButton
			onClick={() => onRemove()}
			size='small'
			icon={TrashIcon} intent="danger"/>
		<Controller
			control={control}
			name={`${cType}.${index}.elementName`}
			defaultValue={elNameList[0]}
			render={({field}) => (
				<SelectField
					{...field}
					onChange={(e) => onChange(e.target.value)}
					inputWidth="100%"
					className="custom-select"
					label="Element Name">
					{elNameList!.map((name, index) => <option key={`${index}${name}`} value={name}>{name}</option>)}
				</SelectField>
			)}
		/>

		<span className="sign">=</span>
		<Controller
			control={control}
			name={`${cType}.${index}.valueToPass`}
			defaultValue={field.valueToPass}
			render={({field}) => (
				<TextInputField
					{...field}
					onKeyUp={() => onChange()}
					autoComplete="off"
					inputWidth="100%"
					className="custom-select"
					label="Value To Pass"/>
			)}
		/>
	</ConditionElementContainer>
}
