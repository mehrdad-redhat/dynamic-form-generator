import * as React from 'react'
import {RouterProvider} from 'react-router-dom'
import {QueryClientProvider} from '@tanstack/react-query'
import './global.css'
import {createRoot} from "react-dom/client";
import {router} from "./app.router";
import {queryClient} from "./query-client";
import {UserStateContextProvider} from "./contexts/user.context";


const container: HTMLElement | null = document.getElementById('root');
const root = createRoot(container!);
root.render(
	// <React.StrictMode> :TODO uncomment it
	<QueryClientProvider client={queryClient}>
		<UserStateContextProvider>
			<RouterProvider router={router}/>
		</UserStateContextProvider>
	</QueryClientProvider>
	// </React.StrictMode>
);
