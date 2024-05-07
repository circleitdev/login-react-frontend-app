import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Success = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Check login status
		if (Cookies.get('isLoggedIn') === 'true') {
			navigate('/success');
		}
	},);

	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<h1 className='text-2xl'>Success Login Hu!</h1>
		</div>
	);
};

export default Success;
