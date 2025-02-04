import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import AvatarUser from "./AvatarUser";
import Login from "./Login";
import AddRecipeButton from "./AddRecipeButton";

const NavBar = () => {
    const { state, dispatch } = useContext(UserContext);
    const [openLogin, setOpenLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [savedUser, setSavedUser] = useState(null);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        top: '20px',
        right: '40px',
        left: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const navStyle: React.CSSProperties = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'flex-end'
    };

    const linkStyle = {
        color: '#9c27b0',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        padding: '0 15px'
    };

    const buttonStyle = {
        ...linkStyle,
        backgroundColor: '#9c27b0',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <nav style={navStyle}>
                {state.user && <AddRecipeButton />}
                <Link to='/about' style={linkStyle}>About</Link>
                <Link to='/' style={linkStyle}>Home</Link>
                <Link to='/recipes' style={linkStyle}>מתכונים</Link>
                {!state.user && (
                    <button onClick={handleOpenLogin} style={buttonStyle}>
                        כניסה
                    </button>
                )}
                {state.user && <AvatarUser savedUser={state.user} handleLogout={handleLogout} />}
            </nav>
            <Login 
                open={openLogin} 
                setOpen={setOpenLogin} 
                setIsLogin={setIsLogin}
                setSavedUser={setSavedUser}
            />
        </div>
    );
};

export default NavBar;
