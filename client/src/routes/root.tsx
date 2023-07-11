import * as React from 'react'
import {useEffect} from 'react'
import {NavLink, Outlet, useNavigate, useNavigation,} from 'react-router-dom'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {Button, Heading, Pane} from "evergreen-ui";
import {AuthGuard} from "../helpers/auth.guard";
import {PageService} from "../services/page.service";
import {useUserStateContext} from '../contexts/user.context';
import {userService} from "../services/user.service";

const Root: React.FC = () => {

	const navigation = useNavigation()
	const navigate = useNavigate();
	const userContext = useUserStateContext();
	const user = userService.getUserFromLocalStorage();

	useEffect(() => {
		if (user)
			userContext.dispatch({type: "SET_USER", payload: user})
	}, []);

	const {isLoading, data: pages} = useQuery(
		['pages'],
		() => PageService.getAllPages(),
		{
			select: (data) => data.pages
		}
	);
	const queryClient = useQueryClient();

	const createNewPage = async () => {
		const newPage = await PageService.createPage({
			name: 'New Page',
			elements: []
		});
		queryClient.invalidateQueries(['pages']).then();
		navigate(`pages/${newPage._id}`);
	}

	const logout = () => {
		localStorage.removeItem('user');
		userContext.dispatch({type: "LOGOUT_USER"});
		navigate('/login')
	}


	return (
		<AuthGuard>
			<section id='root-container'>
				<header>
					<h1>Form Generator</h1>
					<div id="profile">
						<span>You logged in as <strong>{user && user.name}</strong></span>
						<Button onClick={() => logout()} size="small" marginLeft='12px'>Logout</Button>
					</div>
				</header>
				<main>
					<aside id="sidebar">
						<Pane display='flex' justifyContent='space-between'>
							<Heading size={500}>
								Pages
							</Heading>
							<Button appearance="primary" onClick={() => createNewPage()}>New</Button>
						</Pane>
						<nav>
							{pages?.length ? (
								<ul>
									{pages.map((page) => (
										<li key={page._id}>
											<NavLink
												to={`pages/${page._id}`}
												className={({isActive, isPending}) =>
													isActive ? 'active' : isPending ? 'pending' : ''
												}
											>
												{page.name}
											</NavLink>
										</li>
									))}
								</ul>
							) : (
								<p>
									<i>No pages</i>
								</p>
							)}
						</nav>
					</aside>
					<div
						id="detail"
						className={navigation.state === 'loading' ? 'loading' : ''}
					>
						<Outlet/>
					</div>
				</main>
			</section>
		</AuthGuard>
	)
}
export default Root;
