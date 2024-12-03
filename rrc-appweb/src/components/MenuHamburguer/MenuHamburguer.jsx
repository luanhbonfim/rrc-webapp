import './style.css'
import { useState } from "react";
import ImgMimosa from '../../assets/imgs/logo_mimosa.jpg';
import IconNotificacao from '../../assets/imgs/notificacao.png';
import { Link } from 'react-router-dom';

export default function MenuHamburguer() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="hamburguer-icon" onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <div className='side-cabecalho'>
                            <Link to="/" className="link-hamburg">
                                <h2>Menu</h2>
                            </Link>
                            <li onClick={toggleMenu}>X</li>
                        </div>
                      
                        <Link to="/campanha" className="link-hamburg">
                            <li>Cadastrar campanhas</li>
                        </Link>
                        <Link to="/list-campanhas" className="link-hamburg">
                            <li>Campanhas cadastradas</li>
                        </Link>
                        <li>Cadastrar associados</li>
                        <li>Cadastrar títulos</li>
                        <li>Cadastrar doações</li>
                        <Link to="/netflix-ta-cara-meus-anjos" className="link-hamburg">
                            <li>Cadastrar Despesas</li>
                        </Link>
                        <li>Cadastrar cargos</li>
                        <Link to="/gerenciar-tipos-produtos" className="link-hamburg">
                            <li>Cadastrar Produtos</li>
                        </Link>
                    </ul>
                </div>

                <div className="navbar-list">
                    <img src={IconNotificacao} alt="Icone sino" />
                    <img src={ImgMimosa} alt="Logo Rotaract Mimosa" id="icon-mimosa"/>
                    <p>RRC</p>
                </div>
            </nav>
        </>
    )
}