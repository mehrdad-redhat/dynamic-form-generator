import {ElementType, Page} from "../models";
import React from "react";
import styled from "@emotion/styled";
import {Button, PlusIcon, TextInputField} from "evergreen-ui";
import {CheckboxEl, ElementComponent, RadioEl, SelectEl, TextEl} from "./Elements";
import {ElementBox} from "./ElementBox";
import {Swatch} from "../theme";

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 12px;
  overflow: auto;
  padding: 0 12px 12px 12px;
`

interface EditProps {
	page: Page
}

const EmptyBox = styled(ElementBox)`
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #a3a3a3;
  font-style: italic;
  height: 70px;
`

const switchElement = (element: ElementComponent, index: number) => {
	switch (element.type) {
		case ElementType.TEXT:
			return <TextEl key={index} element={element}/>
		case ElementType.CHECKBOX:
			return <CheckboxEl key={index} element={element}/>
		case ElementType.SELECT:
			return <SelectEl key={index} element={element}/>
		case ElementType.RADIO:
			return <RadioEl key={index} element={element}/>

	}
}

const ButtonGroup = styled.div`
	display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  margin-top: 12px;
  #text{
    background-color: ${Swatch.textElementColor};
  }
  #check{
    background-color: ${Swatch.checkElementColor};
  }
  #select{
    background-color: ${Swatch.selectElementColor};
  }
  #radio{
    background-color: ${Swatch.radioElementColor};
  }
`

const Edit: React.FC<EditProps> = ({page}) => {

	return (
		<FormContainer>

			<TextInputField
				label="Page's Name"
				defaultValue={page.name}
				marginBottom={0}
				style={{width:'auto'}}
			/>
			{
				page.elements.length === 0 ?
					<EmptyBox>There isn't any elements!</EmptyBox> :
					page.elements.map((el, index) =>
						switchElement(el as ElementComponent, index)
					)
			}
			<ButtonGroup>
				<Button iconBefore={PlusIcon} id="text">Text Field</Button>
				<Button iconBefore={PlusIcon} id="check">Checkbox</Button>
				<Button iconBefore={PlusIcon} id="select">Select Box</Button>
				<Button iconBefore={PlusIcon} id="radio">Radio Button</Button>
			</ButtonGroup>
		</FormContainer>
	)
}

export default Edit;
