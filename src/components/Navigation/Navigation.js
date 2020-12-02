import { Link } from 'react-router-dom';

const Navigation = ({ onLogout, isAuthenticated }) => {
    if (isAuthenticated) {
        return (
            <nav> 
                <p className='flex justify-end f3 link dim black underline pa3 pointer' onClick={onLogout}>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="flex justify-end"> 
                <Link to="/register">
                    <p className='f3 link dim black underline pa3 pointer'>Register</p>
                </Link>
                <Link to="/">
                    <p className='f3 link dim black underline pa3 pointer'>Sign In</p>
                </Link>
            </nav>
        );
    }
}

export default Navigation;