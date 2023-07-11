import React from 'react';
import {User} from "../models";

type State = {
	authUser: User | null;
};

type Action = {
	type: string;
	payload?: User | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
	authUser: null,
};

type StateContextProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'SET_USER': {
			return {
				...state,
				authUser: action.payload,
			};
		}
		case 'LOGOUT_USER': {
			return {
				...state,
				authUser: null,
			};
		}
		default: {
			throw new Error(`Unhandled action type`);
		}
	}
};

const UserStateContextProvider = ({children}: StateContextProviderProps) => {
	const [state, dispatch] = React.useReducer(stateReducer, initialState);
	const value = {state, dispatch};
	return (
		<UserStateContext.Provider value={value}>{children}</UserStateContext.Provider>
	);
};

const useUserStateContext = () => {
	const context = React.useContext(UserStateContext);

	if (context) {
		return context;
	}

	throw new Error(`useStateContext must be used within a UserStateContextProvider`);
};

export {UserStateContextProvider, useUserStateContext};
