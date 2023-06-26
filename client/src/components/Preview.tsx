import styled from "@emotion/styled";
import {ElementType, Page} from "../models";
import React from "react";
import {Checkbox, Heading, RadioGroup, SelectField, Text, TextInputField} from "evergreen-ui";
import {nameDecorate} from "../helpers/functions";

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  overflow: auto;
  row-gap: 12px;
  width: 100%;
  padding: 0 12px 12px 12px;
`

interface PreviewProps {
	page: Page
}

export const Preview:React.FC<PreviewProps> = ({page}) => {
	return (
		<FormContainer>
			<Heading textAlign='center' marginBottom='16px' size={500} is='h4'>{page.name}</Heading>
			<Form>
				{
					page.elements.length === 0 ?
						<Text textAlign='center' color='muted' size={300}>Form doesn't have any input</Text> :
						page.elements.map((el,index)=>{
							switch(el.type){
								case ElementType.TEXT:
									return (<TextInputField
										key={index}
										label={nameDecorate(el.name)}
										marginBottom={0}
										style={{width:'60%'}}
									/>)
								case ElementType.CHECKBOX:
									return (
										<Checkbox
											key={index}
											label={nameDecorate(el.name)}/>
									)
								case ElementType.SELECT:
									return (
										<SelectField label={nameDecorate(el.name)}>
											{el.choices!.map((o,index)=><option key={index} selected={index===0} value="sd">{nameDecorate(o)}</option>)}
										</SelectField>
									)
								case ElementType.RADIO:
									return (
										<RadioGroup
											label={nameDecorate(el.name)}
											value={el.choices![0]}
											options={el.choices!.map(ch=>{return {value:ch,label:nameDecorate(ch)}})}
										/>
									)
							}
						})
				}
			</Form>
		</FormContainer>
	)
}
