import './style.css'
import { useState } from "react";
import ImgMimosa from '../../assets/imgs/logo_mimosa.jpg';
import IconNotificacao from '../../assets/imgs/notificacao.png';

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
                            <h2>Menu</h2>
                            <li onClick={toggleMenu}>X</li>
                        </div>
                        <li>Cadastrar doações</li>
                        <li>Cadastrar associados</li>
                        <li>Cadastrar campanhas</li>
                        <li>Cadastrar títulos</li>
                        <li>Cadastrar doações</li>
                        <li>Cadastrar mensalidades</li>
                        <li>Cadastrar cargos</li>
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