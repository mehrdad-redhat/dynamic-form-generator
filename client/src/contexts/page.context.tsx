import React from 'react';
import {Page} from "../models";

type State = {
	currentPage: Page | null;
};

type Action = {
	type: string;
	payload?: Page | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
	currentPage: null,
};

type StateContextProviderProps = { children: React.ReactNode };

const PageStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'SET_PAGE': {
			return {
				...state,
				currentPage: action.payload,
			};
		}
		default: {
			throw new Error(`Unhandled action type`);
		}
	}
};

const PageStateContextProvider = ({ children }: StateContextProviderProps) => {
	const [state, dispatch] = React.useReducer(stateReducer, initialState);
	const value = { state, dispatch };
	return (
		<PageStateContext.Provider value={value}>{children}</PageStateContext.Provider>
	);
};

const usePageStateContext = () => {
	const context = React.useContext(PageStateContext);

	if (context) {
		return context;
	}

	throw new Error(`useStateContext must be used within a PageStateContextProvider`);
};

export { PageStateContextProvider, usePageStateContext };
