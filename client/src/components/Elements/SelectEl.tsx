import React, {useCallback} from "react";
import {IconButton, TagInput, TextInputField, TrashIcon} from "evergreen-ui";
import {ElementBox, Label, Section} from "../ElementBox";
import {ElementProps} from "./index";
import {usePageEditMutation, useSinglePageQuery} from "../../routes/page";
import {SubmitHandler, useForm} from "react-hook-form";
import {ConditionBox} from "../ConditionBox";

type SelectElementEditForm = { name: string, choices: string[] }
export const SelectEl: React.FC<ElementProps> = ({elIndex, formRef, onRemove}) => {
	const {data: page} = useSinglePageQuery()
	const {mutateAsync: updatePage} = usePageEditMutation();
	const element = page.elements[elIndex];
	const [choices, setChoices] = React.useState<string[]>(element.choices || [])

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: {errors},
	} = useForm<SelectElementEditForm>({
		defaultValues: {name: element.name, choices: element.choices}
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

	const submit: SubmitHandler<SelectElementEditForm> = (formData) => {
		page.elements[elIndex] = {...page.elements[elIndex], ...formData};
		updatePage({...page}).then(scrollToView)
	}

	const tagChangeHandler = (values) => {
		setValue('choices', values);
		submit(getValues());
		setChoices(values)
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
						label="SelectBox Name"
						marginBottom={0}
						style={{width: 'auto'}}
					/>
				</form>
				<span className="box-type">
					<IconButton
						onClick={handleRemove}
						size='small'
						icon={TrashIcon} intent="danger"/>
					Select Box</span>
			</div>
			<Section>
				<Label>Choices</Label>
				<TagInput
					onClick={(e) => e.stopPropagation()}
					style={{backgroundColor: 'rgba(255,255,255,0.75)'}}
					inputProps={{placeholder: 'Press "Enter" to add choices...'}}
					values={choices}
					onChange={tagChangeHandler}
				/>
			</Section>
			<Section>
				<Label>Conditions</Label>
				<ConditionBox elIndex={elIndex}/>
			</Section>
		</ElementBox>
	)
}
