import React, {useCallback} from "react";
import {IconButton, TextInputField, TrashIcon} from "evergreen-ui";
import {ElementBox, Label, Section} from "../ElementBox";
import {usePageEditMutation, useSinglePageQuery} from "../../routes/page";
import {SubmitHandler, useForm} from "react-hook-form";
import {ElementsEditForm} from "../Edit";
import {ElementProps} from "./index";
import {ConditionBox} from "../ConditionBox";

type CheckBoxElementEditForm = { name: string }

export const CheckboxEl: React.FC<ElementProps> = ({elIndex, formRef, onRemove}) => {
	const {data: page} = useSinglePageQuery()
	const {mutateAsync: updatePage} = usePageEditMutation();
	const element = page.elements[elIndex];

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<CheckBoxElementEditForm>({
		defaultValues: {name: element.name}
	});

	const scrollToView = useCallback(
		() => {
			if (formRef.current.children[elIndex]) {
				formRef.current.children[elIndex].scrollIntoView({behavior: 'smooth'});
				formRef.current.children[elIndex].classList.add('pulse');
				setTimeout(() => formRef.current.children[elIndex].classList.remove('pulse'), 4000)
			}
		},
		[]
	);


	const submit: SubmitHandler<ElementsEditForm> = (formData) => {
		page.elements[elIndex] = {...page.elements[elIndex], ...formData};
		updatePage({...page}).then(scrollToView)
	}

	const handleRemove = useCallback((e) => {
		e.stopPropagation();
		onRemove(elIndex);
	}, [])

	return (
		<ElementBox elType={element.type} onClick={scrollToView}>
			<div className="top">
				<form onSubmit={handleSubmit(submit)}>
					<TextInputField
						onClick={(e) => e.stopPropagation()}
						{...register('name', {required: 'name is required!'})}
						isInvalid={!!errors!.name}
						validationMessage={errors!.name?.message}
						label="CheckBox Name"
						marginBottom={0}
						style={{width: 'auto'}}
					/>
				</form>
				<span className="box-type">
					<IconButton
						onClick={handleRemove}
						size='small'
						icon={TrashIcon} intent="danger"/>
					Checkbox</span>
			</div>
			<Section>
				<Label>Conditions</Label>
				<ConditionBox elIndex={elIndex}/>
			</Section>
		</ElementBox>
	)
}
