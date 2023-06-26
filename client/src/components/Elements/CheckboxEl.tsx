import {Element, ElementType} from '../../models'
import React from "react";
import {TextInputField} from "evergreen-ui";
import styled from "@emotion/styled";
import {Swatch} from "../../theme";
import {ElementBox} from "../ElementBox";

export interface CheckboxElement extends Omit<Element, 'type'> {
	type: ElementType.CHECKBOX
}

interface CheckboxElementProps {
	element: CheckboxElement
}

const Box = styled(ElementBox)`
  background-color: ${Swatch.checkElementColor};
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

export const CheckboxEl: React.FC<CheckboxElementProps> = ({element}) => {
	return (
		<Box>
			<div className="top">
				<CustomTextInputField
					label="Input Name"
					defaultValue={element.name}
					marginBottom={0}
				/>
				<span style={{color:'#a5a5a5',fontSize:'11px'}}>Checkbox</span>
			</div>
		</Box>
	)
}
