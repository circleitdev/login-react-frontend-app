import { useState } from 'react';
import { images, users } from '@/utils/constant';
import CardBackgroundCover from '@/components/card/card-background-cover';
import NotReadyResponsive from '@/components/miscellaneous/not-ready-responsive';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [submitError, setSubmitError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	// Show and Hide Password
	const [showPassword, setShowPassword] = useState(false);
	// Show Toast
	const [showToast, setShowToast] = useState(false);
	// Direct to Success page
	const navigate = useNavigate();

	// Email Handler Required
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		if (e.target.value && !e.target.value.includes('@')) {
			setEmailError('Email must have @');
		} else {
			setEmailError('');
		}
	};

	// Disable Password Handler
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	// Error Handler for Email and Password incorrect
	const handleSubmit = (e) => {
		e.preventDefault();
		const user = users.find((user) => user.email === email);

		// Get failed attempts from cookies
		const failedAttempts = JSON.parse(Cookies.get('failedAttempts') || '{}');

		// Check if password field is empty
		if (!password) {
			setPasswordError('Password must be filled first');
			return;
		}

		if (!user) {
			setSubmitError('Make sure your email is correct');
		} else if (failedAttempts[user.email] && failedAttempts[user.email] >= 3) {
			setSubmitError('Your account has been disabled due to 3 failed login attempts');
		} else if (user.password !== password) {
			// Increment failed attempts and save to cookies
			failedAttempts[user.email] = (failedAttempts[user.email] || 0) + 1;
			Cookies.set('failedAttempts', JSON.stringify(failedAttempts));
			setPasswordError('Password incorrect');
		} else {
			// Reset failed attempts for this user and save to cookies
			failedAttempts[user.email] = 0;
			Cookies.set('failedAttempts', JSON.stringify(failedAttempts));
			// Save login status in cookies
			Cookies.set('isLoggedIn', 'true');
			setEmailError('');
			setPasswordError('');
			setSubmitError('');
			setShowToast(true);
			setTimeout(() => {
				navigate('/success', { replace: true });
			}, 3000);
		}
	};

	return (
		<>
			<div className='hidden h-screen w-full overflow-hidden xl:grid   xl:grid-cols-2'>
				{/* Component CardBackgroundCover */}
				<CardBackgroundCover />
				{/* Content */}
				<div className='relative flex items-center justify-start bg-white'>
					<div className='mx-login-157.5 gap-y-login-25 flex w-full flex-col items-start justify-center'>
						<div className='gap-y-login-11 flex w-full flex-col'>
							<h3 className='text-login-26 leading-login-26 tracking-login-2 align-middle font-semibold'>Login</h3>
							<p className='leading-login-14 text-gray-primary align-middle text-sm font-semibold'>Please log in to start using HRIS</p>
						</div>

						{/* Form Login */}
						<form className='space-y-login-25 w-full' onSubmit={handleSubmit}>
							<div className='gap-y-login-10 flex flex-col'>
								<div className={`relative flex h-12 items-center rounded-md border text-sm ${emailError ? 'border-red-primary' : 'border-blue-primary'} `}>
									<div className='relative mx-4 h-7 w-full'>
										<input
											autoComplete='off'
											id='email'
											name='email'
											type='text'
											className='text-login-14 text-black-primary peer mt-1 h-7 w-full bg-transparent font-semibold placeholder-transparent focus:mt-1 focus:outline-none'
											placeholder='Email'
											value={email}
											onChange={handleEmailChange}
										/>
										<label
											htmlFor='email'
											className='text-login-10 text-gray-primary peer-placeholder-shown:text-gray-primary peer-focus:text-login-10 peer-focus:text-gray-primary absolute -top-1.5 left-0 font-medium transition-all peer-placeholder-shown:top-0.5 peer-placeholder-shown:text-base peer-focus:-top-1.5 peer-focus:font-semibold'
										>
											Email
										</label>
									</div>
								</div>
								{emailError && <p className='text-login-13 text-red-primary font-normal'>{emailError}</p>}
							</div>
							{/* Password */}
							<div className='gap-y-login-10 flex flex-col'>
								<div className={`relative flex h-12 items-center rounded-md border text-sm ${passwordError ? 'border-red-primary' : 'border-blue-primary'}`}>
									<div className='relative mx-4 h-7 w-full'>
										<input
											autoComplete='off'
											id='password'
											name='password'
											type={showPassword ? 'text' : 'password'}
											className='text-login-14 text-black-primary peer mt-2 h-7 w-full bg-transparent font-semibold placeholder-transparent focus:mt-2 focus:outline-none'
											placeholder='Password'
											value={password}
											onChange={handlePasswordChange}
											disabled={emailError}
										/>
										<label
											htmlFor='password'
											className='text-login-10 text-gray-primary peer-placeholder-shown:text-gray-primary peer-focus:text-login-10 peer-focus:text-gray-primary absolute -top-1.5 left-0 font-medium transition-all peer-placeholder-shown:top-0.5 peer-placeholder-shown:text-base peer-focus:-top-1.5 peer-focus:font-semibold'
										>
											Password
										</label>
										{showPassword ? (
											<img src={images[1].path} alt={images[1].alt} srcSet={images[1].srcset} className='absolute right-4 top-0.5 h-6 w-6 cursor-pointer' onClick={() => setShowPassword(false)} /> // modify this line
										) : (
											<img src={images[2].path} alt={images[2].alt} srcSet={images[2].srcset} className='absolute right-4 top-0.5 h-6 w-6 cursor-pointer' onClick={() => setShowPassword(true)} /> // modify this line
										)}
									</div>
								</div>
								{passwordError && <p className='text-login-13 text-red-primary font-normal'>{passwordError}</p>}
							</div>

							<div className='gap-x-login-10 inline-flex items-center'>
								<label className='relative flex cursor-pointer items-center rounded-lg' htmlFor='customStyle'>
									<input
										type='checkbox'
										className="before:content[''] border-gray-teritary bg-gray-teritary checked:border-gray-teritary checked:bg-blue-secondary checked:before:bg-blue-secondary peer relative h-8 w-8 cursor-pointer appearance-none rounded-lg border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-lg before:bg-blue-500 before:opacity-0 before:transition-opacity hover:scale-105 hover:before:opacity-0"
										id='customStyle'
									/>
									<span className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
										<svg xmlns='http://www.w3.org/2000/svg' className='h-3.5 w-3.5' viewBox='0 0 20 20' fill='currentColor' stroke='currentColor'>
											<path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'></path>
										</svg>
									</span>
								</label>
								<p className='text-gray-secondary text-sm font-medium'>Remember me</p>
							</div>

							{/* Button Login */}
							<button type='submit' className='bg-blue-secondary hover:bg-blue-primary h-12 w-full rounded-lg text-sm font-medium leading-5  text-white focus:outline-none'>
								Login
							</button>
						</form>
						{/* Error Handling for Wrong Email or Password */}
						{submitError && <p className='w-login-324 text-login-13 text-red-primary font-normal'>{submitError}</p>}
					</div>
					{showToast && (
						<div id='toast-success' className='animate-slideInFromLeft absolute bottom-0 right-0 mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow' role='alert'>
							<div className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500'>
								<svg className='h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
									<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
								</svg>
							</div>
							<div className='ms-3 text-sm font-normal'>Login successfully.</div>
							<button
								type='button'
								className='-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300'
								data-dismiss-target='#toast-success'
								aria-label='Close'
							>
								<span className='sr-only'>Close</span>
								<svg className='h-3 w-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
									<path stroke='currentColor' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
								</svg>
							</button>
						</div>
					)}
				</div>
			</div>
			{/* Component NotReadyResponsive */}
			<NotReadyResponsive />
		</>
	);
};

export default Login;
