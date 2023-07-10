import styled from "@emotion/styled";
import {Condition, Element, ElementType} from "../models";
import React, {ReactNode} from "react";
import {Checkbox, Heading, RadioGroup, SelectField, Text, TextInputField} from "evergreen-ui";
import {nameDecorate} from "../helpers/functions";
import {useSinglePageQuery} from "../routes/page";

import {keyframes} from "@emotion/react";
import {Swatch} from "../theme";
import {useForm} from "react-hook-form";


const fadeAnimation = (color)=>keyframes`
  0% {
    background-color: rgb(0 0 0 / 0);
    padding: 0;
  }
  50% {
    background-color: ${color};
    padding: 4px;
  }
  100% {
    background-color: rgb(0 0 0 / 0);
    padding: 0;
  }`

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: auto;

  & > form {
    display: flex;
    flex-direction: column;
    overflow: auto;
    row-gap: 12px;
    width: 100%;
    padding: 0 12px 12px 12px;

    & > .elBox {
      border-radius: 5px;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
      animation-play-state: paused;
      .radio-style{
        &>span{
          color:#101840
        }
      }
    }
    & > .text-pulse{
      animation-name: ${fadeAnimation(Swatch.textElementColor)};
    }
    & > .checkbox-pulse{
      animation-name: ${fadeAnimation(Swatch.checkElementColor)};
    }
    & > .select-pulse{
      animation-name: ${fadeAnimation(Swatch.selectElementColor)};
    }
    & > .radio-pulse{
      animation-name: ${fadeAnimation(Swatch.radioElementColor)};
    }
    &> .pulse{
      animation-play-state: running;
    }
  }
`

type PreviewForm = {
	[key: string]: string|boolean
}

export const Preview = React.forwardRef<HTMLFormElement>(
	(props, ref) => {
		const {data: page} = useSinglePageQuery();
		const defaultValues = page.elements.reduce((dv, element)=>{
			switch(element.type){
				case ElementType.TEXT:
					dv[element.name]=''
					break;
				case ElementType.CHECKBOX:
					dv[element.name]=false
					break;
				case ElementType.RADIO:
					dv[element.name]=element.choices[0] || ''
					break;
				case ElementType.SELECT:
					dv[element.name]=element.choices[0] || ''
					break;
			}
			return dv;
		},{})
		const {
			register,
			handleSubmit,
			getValues,
			watch,
			formState:{errors}
		} = useForm<PreviewForm>({
			defaultValues,
		})
		
		const currentValues = watch();
		// for(let el of page.elements){
		// 	console.log({required: conditionCheck(getValues(),el.requiredIf)&&`${el.name} is required!`,
		// 		disabled: !conditionCheck(getValues(),el.editableIf),
		// 		shouldUnregister: conditionCheck(getValues(),el.visibleIf)})
		// }


		const onSubmit = (data: PreviewForm) => console.log(data)
		return (
			<FormContainer>
				<Heading textAlign='center' marginBottom='16px' size={500} is='h4'>{page.name}</Heading>
				<form ref={ref} onSubmit={handleSubmit(onSubmit)}>
					{
						page.elements.length === 0 ?
							<Text textAlign='center' color='muted' size={300}>Form doesn't have any input</Text> :
							page.elements.map((el: Element, index: number): ReactNode => {
								console.log(conditionCheck(getValues(), el.visibleIf))
								if(conditionCheck(getValues(),el.visibleIf)===false)
									return null
								
								switch (el.type) {
									case ElementType.TEXT:
										return (
											<div className="elBox text-pulse" key={index}>
												<TextInputField
													{...register(el.name, {
														required: conditionCheck(getValues(),el.requiredIf)&&`${el.name} is required!`,
														disabled: !conditionCheck(getValues(),el.editableIf)===false,
														shouldUnregister: !conditionCheck(getValues(),el.visibleIf),
													})}
													label={nameDecorate(el.name)}
													marginBottom={0}
													style={{width: '60%'}}
												/>
											</div>
										)
									case ElementType.CHECKBOX:
										return (
											<div className="elBox checkbox-pulse" key={index}>
												<Checkbox
													{...register(el.name, {
														required: conditionCheck(getValues(),el.requiredIf)&&`${el.name} is required!`,
														disabled: !conditionCheck(getValues(),el.editableIf)===false,
													})}
													label={nameDecorate(el.name)}/>
											</div>
										)
									case ElementType.SELECT:
										return (
											<div className="elBox select-pulse" key={index}>
												<SelectField
													label={nameDecorate(el.name)}
													defaultValue={el.choices![0]}
													{...register(el.name, {
														required: conditionCheck(getValues(),el.requiredIf)&&`${el.name} is required!`,
														disabled: !conditionCheck(getValues(),el.editableIf)===false,
													})}
												>
													{el.choices!.map((o, index) => <option key={index} value={o}>{o}</option>)}
												</SelectField>
											</div>
										)
									case ElementType.RADIO:
										return (
											<div className="elBox radio-pulse" key={index}>
												<RadioGroup
													label={nameDecorate(el.name)}
													value={el.choices![0]}
													className="radio-style"
													{...register(el.name, {
														required: conditionCheck(getValues(),el.requiredIf)&&`${el.name} is required!`,
														disabled: !conditionCheck(getValues(),el.editableIf),
													})}
													options={
														el.choices!.map(ch => ({value: ch, label: ch}))
													}
												/>
											</div>
										)
									default:
										return null
								}
							})
					}
				</form>
			</FormContainer>
		)
	}
)

function conditionCheck(form:PreviewForm,conditions:Condition[]){
	// console.log(conditions)
	if(!conditions|| conditions!.length===0)
		return null
	for(const condition of conditions){
		// console.log({value: form[condition.elementName], valueToCheck: condition.valueToPass})
		if(form[condition.elementName]===condition.valueToPass)
			return true
	}
		
	return false
}
