import React from "react";
import {ConditionType, ElementType} from "../models";
import styled from "@emotion/styled";
import {IconButton, SmallPlusIcon} from "evergreen-ui";
import {bgColor} from "./ElementBox";

const Frame = styled.section<{ elType: ElementType }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: transparent;
  position: relative;
  width: 98%;
  padding: 16px;
  row-gap: 12px;
  align-self: center;

  .title {
    position: absolute;
    top: -12px;
    left: 12px;
    background-color: ${props => bgColor(props.elType)};
    padding: 2px 7px;
    font-size: 13px;
    color: #343434;
    height: 24px;
    display: flex;
    align-items: center;
    line-height: 294px;
    text-align: center;
    font-weight: 500;
  }

  button {
    position: absolute;
    top: -12px;
    right: 12px;
  }

  .empty-box {
    align-self: center;
    border-radius: 8px;
    border: 1px solid white;
    padding: 8px 12px;
    font-size: 8px;
    font-style: italic;
  }
}
`

type ConditionTypeFrameProps = {
	children: React.ReactNode,
	cType: ConditionType,
	elType: ElementType,
	onAdd: () => void
}

export const ConditionTypeFrame: React.FC<ConditionTypeFrameProps> = ({children, cType, onAdd, elType}) =>
	<Frame elType={elType}>
		<span className="title">{title(cType)}</span>
		<IconButton
			onClick={() => onAdd()}
			size='small'
			icon={SmallPlusIcon} intent="success"/>
		{(children as React.ReactNode[]).length !== 0 ? children : <span className='empty-box'>{emptyBox(cType)}</span>}
	</Frame>

function title(cType: ConditionType) {
	switch (cType) {
		case ConditionType.REQUIRED:
			return "Required If"
		case ConditionType.EDITABLE:
			return "Editable If"
		case ConditionType.VISIBLE:
			return "Visible If"
	}
}

function emptyBox(cType: ConditionType) {
	switch (cType) {
		case ConditionType.REQUIRED:
			return "By default your element isn't mandatory, add some condition to change this behavior"
		case ConditionType.EDITABLE:
			return "By default your element is editable, add some condition to change this behavior"
		case ConditionType.VISIBLE:
			return "By default your element is visible, add some condition to change this behavior"
	}
}
