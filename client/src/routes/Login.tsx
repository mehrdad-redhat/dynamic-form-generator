import styled from "@emotion/styled";
import {Button, Heading, TextInputField} from "evergreen-ui";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {userService} from "../services/user.service";
import {useUserStateContext} from "../contexts/user.context";
import {useMutation} from "@tanstack/react-query";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e3e3e3;
  row-gap: 24px;
`
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 8px;
  border: 1px solid #e3e3e3;
  background-color: white;
  box-shadow: 0 0 1px rgb(40 126 205 / 30%), 0 0 4px 1px rgb(121 155 185 / 47%);
  padding: 16px;
  row-gap: 12px;
`

const logo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuODE4MTgxODIsMTEgTDIwLjE4MTgxODIsMTEgQzIxLjE4NTk3MjMsMTEgMjIsMTEuODk1NDMwNSAyMiwxMyBMMjIsMTUgQzIyLDE2LjEwNDU2OTUgMjEuMTg1OTcyMywxNyAyMC4xODE4MTgyLDE3IEwzLjgxODE4MTgyLDE3IEMyLjgxNDAyNzczLDE3IDIsMTYuMTA0NTY5NSAyLDE1IEwyLDEzIEMyLDExLjg5NTQzMDUgMi44MTQwMjc3MywxMSAzLjgxODE4MTgyLDExIFogTTQsMTMgTDQsMTUgTDIwLDE1IEwyMCwxMyBMNCwxMyBaIE0zLjgxODE4MTgyLDMgTDIwLjE4MTgxODIsMyBDMjEuMTg1OTcyMywzIDIyLDMuODk1NDMwNSAyMiw1IEwyMiw3IEMyMiw4LjEwNDU2OTUgMjEuMTg1OTcyMyw5IDIwLjE4MTgxODIsOSBMMy44MTgxODE4Miw5IEMyLjgxNDAyNzczLDkgMiw4LjEwNDU2OTUgMiw3IEwyLDUgQzIsMy44OTU0MzA1IDIuODE0MDI3NzMsMyAzLjgxODE4MTgyLDMgWiBNNCw1IEw0LDcgTDIwLDcgTDIwLDUgTDQsNSBaIE0yLDE5IEwxNCwxOSBMMTQsMjEgTDIsMjEgTDIsMTkgWiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+";

type LoginInputs = {
	name: string
}

function useQuery() {
	const {search} = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login: React.FC = () => {
	let query = useQuery();
	let navigate = useNavigate();
	const userContext = useUserStateContext();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginInputs>();

	useEffect(() => {
		// Logout user 
		localStorage.removeItem('user');
		userContext.dispatch({type: "LOGOUT_USER"});
	}, []);

	const {mutate: loginUser} = useMutation(
		(userData: LoginInputs) => userService.login(userData),
		{
			onSuccess: (user) => {
				// toast.success('You successfully logged in'); TODO:Add Toast
				console.log('LOGIN');
				userContext.dispatch({type: 'SET_USER', payload: user});
				localStorage.setItem('user', JSON.stringify(user));
				const returnUrl = query.get('returnUrl') || '/';
				navigate(returnUrl);
			},
			onError: (error: any) => {
				console.error(error);
			},
		}
	);


	const onSubmit: SubmitHandler<LoginInputs> = (data) => {
		loginUser(data);
	};

	return (
		<Container>
			<LogoContainer>
				<img width="50px" height="50px" alt="logo" src={logo}></img>
				<Heading style={{fontSize: '2rem'}}>Dynamic Form Generator</Heading>
			</LogoContainer>
			<FormContainer onSubmit={handleSubmit(onSubmit)}>
				<TextInputField
					{...register('name', {required: 'name is required!'})}
					name='name'
					isInvalid={!!errors!.name}
					validationMessage={errors!.name?.message}
					label="Hi, Enter your name to login"
					description="If you're here for the first time, we'll register you automatically "
					placeholder="name"
					marginBottom={0}/>
				<Button type="submit" appearance="primary">
					Login
				</Button>
			</FormContainer>
		</Container>
	)
}

export default Login;
