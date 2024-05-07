import { images } from '@/utils/constant';

const CardBackgroundCover = () => {
	return (
		<div className='bg-blue-primary relative flex items-center justify-start'>
			<div className='login-bg-cover absolute inset-0' />
			<div className='mx-20 flex w-full flex-col gap-y-7'>
				<img src={images[0].path} alt={images[0].alt} srcSet={images[0].srcset} className='h-login-134 w-login-113' />
				<div>
					<h4 className='line leading-login-125 text-3xl font-bold text-white'>Human Resource Integrated System</h4>
					<p className='w-login-430 leading-login-125 text-xl font-normal text-white '>Empowering People, Streamlining Processes: Your HRIS Solution</p>
				</div>
			</div>
		</div>
	);
};

export default CardBackgroundCover;
