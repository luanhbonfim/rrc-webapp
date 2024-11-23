import './style.css'
import { Link } from 'react-router-dom';

export default function CardsAtalho() {
    return (
        <>
            <h1 className="atalho">Atalhos</h1>

            <div className="cards">
                <div className="card">
                    <Link to="/campanha">
                        <h3>Cadastrar Campanha</h3>
                    </Link>
                </div>

                <div className="card">
                    <h3>Cadastrar Associado</h3>
                </div>

                <div className="card">
                    <h3>Cadastrar Doação</h3>
                </div>

                <div className="card">
                <Link to="/campanhas">
                    <h3>Campanhas Cadastradas</h3>
                </Link>
                </div>

                <div className="card">
                    <h3>Cadastrar Associado</h3>
                </div>

                <div className="card">
                    <h3>Cadastrar Doação</h3>
                </div>

                <div className="card">
                    <h3>Cadastrar Produtos</h3>
                </div>

            </div>
        </>
    )
}