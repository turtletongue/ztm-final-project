const Navigation = ({ onLogout, isAuthenticated, toRegister, leaveRegister }) => {
    if (isAuthenticated) {
        return (
            <nav> 
                <p className='flex justify-end f3 link dim black underline pa3 pointer' onClick={onLogout}>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="flex justify-end"> 
                <p className='f3 link dim black underline pa3 pointer' onClick={toRegister}>Register</p>
                <p className='f3 link dim black underline pa3 pointer' onClick={leaveRegister}>Sign In</p>
            </nav>
        );
    }
}

export default Navigation;