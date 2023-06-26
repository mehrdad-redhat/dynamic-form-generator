import {Element, ElementType} from '../../models'
import React from "react";
import {TextInputField} from "evergreen-ui";
import styled from "@emotion/styled";
import {Swatch} from "../../theme";
import {ElementBox} from "../ElementBox";

export interface TextElement extends Omit<Element, 'type'> {
	type: ElementType.TEXT
}

interface TextElementProps {
	element: TextElement
}

const Box = styled(ElementBox)`
  background-color: ${Swatch.textElementColor};
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

export const TextEl: React.FC<TextElementProps> = ({element}) => {
	return (
		<Box>
			<div className='top'>
				<CustomTextInputField
					label="Input Name"
					defaultValue={element.name}
					marginBottom={0}
				/>
				<span style={{color:'#a5a5a5',fontSize:'11px'}}>Text Field</span>
			</div>
		</Box>
	)
}
