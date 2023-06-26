import {Element, ElementType} from '../../models'
import React from "react";
import {TextInputField, Text, TagInput} from "evergreen-ui";
import styled from "@emotion/styled";
import {Swatch} from "../../theme";
import {ElementBox} from "../ElementBox";

export interface SelectElement extends Omit<Element, 'type'> {
	type: ElementType.SELECT
}

interface SelectElementProps {
	element: SelectElement
}

const Box = styled(ElementBox)`
  background-color: ${Swatch.selectElementColor};
  display: flex;
  flex-direction: column;
  & > .top{
    display: flex;
    justify-content: space-between;
  }
`

const CustomTextInputField = styled(TextInputField)`
  background-color:rgba(255,255,255,0.75);
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #101840;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`
export const SelectEl: React.FC<SelectElementProps> = ({element}) => {
	const [choices, setChoices] = React.useState<string[]>(element.choices || [])
	return (
		<Box>
			<div className="top">
				<CustomTextInputField
					label="Input Name"
					defaultValue={element.name}
					marginBottom={0}
				/>
				<span style={{color:'#a5a5a5',fontSize:'11px'}}>Select Box</span>
			</div>
			<Section>
				<Label>Choices</Label>
				<TagInput
					style={{backgroundColor:'rgba(255,255,255,0.75)'}}
					inputProps={{ placeholder: 'Press "Enter" to add choices...' }}
					values={choices}
					onChange={(values) => {
						setChoices(values)
					}}
				/>
			</Section>
		</Box>
	)
}
