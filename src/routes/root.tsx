import * as React from 'react'
import {Form, NavLink, Outlet, useNavigate, useNavigation,} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {Button, Heading, Pane} from "evergreen-ui";
import {createPage, getPages} from "../fake-data";

const pageListQuery = () => ({
	queryKey: ['pages', 'list', 'all'],
	queryFn: () => getPages(),
})

const Root: React.FC = () => {
	const {data:pages}= useQuery(pageListQuery());
	const navigation = useNavigation()
	const navigate = useNavigate();
	
	const createNewPage = async ()=> {
		const newPage = await createPage('New Page');
		navigate(`pages/${newPage.id}`);
	}

	return (
		<>
			<div id="sidebar">
				<h1>Form Generator</h1>
				<Pane display='flex' justifyContent='space-between'>
					<Heading size={500}>
						Pages
					</Heading>
					<Button appearance="primary" onClick={()=>createNewPage()}>New</Button>
				</Pane>
				<nav>
					{pages?.length ? (
						<ul>
							{pages.map((page) => (
								<li key={page.id}>
									<NavLink
										to={`pages/${page.id}`}
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
			</div>
			<div
				id="detail"
				className={navigation.state === 'loading' ? 'loading' : ''}
			>
				<Outlet/>
			</div>
		</>
	)
}
export default Root;
