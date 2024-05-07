import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/app/Login';
import Success from '@/app/Success';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/success' element={<Success />} />
			</Routes>
		</Router>
	);
}

export default App;
