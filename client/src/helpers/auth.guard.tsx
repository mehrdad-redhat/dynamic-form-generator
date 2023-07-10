import {useEffect, useState} from 'react';
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";
import {userService} from "../services/user.service";

function AuthGuard({children}) {
	const router = useLocation();
	const navigate = useNavigate();
	const [authorized, setAuthorized] = useState(false);

	const user = userService.getUserFromLocalStorage();
	useEffect(() => {
		// on initial load - run auth check
		authCheck(router.pathname);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	function authCheck(url) {
		// redirect to login page if accessing a private page and not logged in
		const publicPaths = ['/login'];
		const path = url.split('?')[0];
		if (!user && !publicPaths.includes(path)) {
			setAuthorized(false);
			navigate({
				pathname: "/login",
				search: createSearchParams({
					returnUrl: router.pathname
				}).toString()
			});
		} else {
			setAuthorized(true);
		}
	}

	return authorized && children;
}

export {AuthGuard};
