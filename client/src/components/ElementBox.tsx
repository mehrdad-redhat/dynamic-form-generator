import styled from "@emotion/styled";
import {ElementType} from "../models";
import {Swatch} from "../theme";

export const ElementBox = styled.div<{elType?:ElementType}>`
  border-radius: 6px;
  box-shadow: 0 0 1px rgb(40 126 205 / 30%), 0 0 4px 1px rgb(121 155 185 / 47%);
  padding: 10px;
  width: 100%;
  display: flex;
  row-gap: 16px;
  flex-direction: column;
  background-color: ${props => props.elType ? bgColor(props.elType) : 'transparent'};
  
  & > .top {
    display: flex;
    justify-content: space-between;
  }
  .box-type {
    color: #a5a5a5;
    font-size: 11px;
    display: flex;
    column-gap: 10px;
    align-items: center;
    align-self: flex-start;
    height: 24px;
    white-space: nowrap;
    >button{
      display: none;
    }
  }
  &:hover .box-type button{
    display: flex !important;
  }
`
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #101840;
`
export const Section = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

export function bgColor(elType: ElementType): string {
	switch (elType) {
		case ElementType.TEXT:
			return Swatch.textElementColor
		case ElementType.CHECKBOX:
			return Swatch.checkElementColor
		case ElementType.SELECT:
			return Swatch.selectElementColor
		case ElementType.RADIO:
			return Swatch.radioElementColor

	}
}
