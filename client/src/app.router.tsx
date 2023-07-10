import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Empty from "./routes/empty";
import Page from "./routes/page";
import Login from "./routes/Login";
import * as React from "react";

export const router = createBrowserRouter([
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
			},
			// { TODO: remove it if there is no time
			//     path: 'pages/:pageId/destroy',
			//     element: <EditPage />,
			// },
		],
	},
	{
		path:'login',
		element: <Login/>,
	},
])
