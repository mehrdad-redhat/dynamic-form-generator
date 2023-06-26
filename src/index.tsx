import * as React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import './index.css'

import ErrorPage from './error-page'
import Root from './routes/root'
import Page from './routes/page'
import Empty from './routes/empty'
import {createRoot} from "react-dom/client";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
		},
	},
})

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				index: true,
				element: <Empty/>,
			},
			{
				path: 'pages/:pageId',
				element: <Page/>,
				// loader: pageLoader(queryClient),
				// action: pageAction(queryClient),
			},
			// { TODO: remove it if there is no time
			//     path: 'pages/:pageId/destroy',
			//     element: <EditPage />,
			//     action: destroyAction(queryClient),
			//     errorElement: <div>Oops! There was an error.</div>,
			// },
		],
	},
])

const container: HTMLElement | null = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
		</QueryClientProvider>
	</React.StrictMode>
);
