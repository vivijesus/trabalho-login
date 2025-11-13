import './index.css';
import { Route, Routes, Link } from 'react-router-dom';

import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Private } from '../Private';
import { RequireAuth } from '../../contexts/Auth/RequireAuth';
import { Login } from '../Login';
import logo from '../../img/image.png';
import { Button } from '@chakra-ui/react';
import { Cadastrar } from '../Cadastrar';

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const auth = useContext(AuthContext);

    const handleLogout = async () => {
        await auth.signout();
        window.location.href = window.location.href;
    }

    return (
        <div className="Navbar">
            <nav>
                <Link to="/" className="title">
                    <img src={logo} alt="" />
                </Link>
                <div className="menu" onClick={() =>    yuu(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        {auth.user &&

                             <Button colorPalette="blue"
                                onClick={handleLogout}
                                type="button"
                            >
                                Sair
                            </Button>}

                    </li>
                </ul>
            </nav>
            
            <hr />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
            </Routes>
        </div>
    );
}

export default Navbar;
