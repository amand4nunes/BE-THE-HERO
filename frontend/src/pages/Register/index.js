import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
//arquivo responsavel para fazer a conexão com o backend 
import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    //função responsavel em fazer o cadastro do usuario
    async function handleRegister(e) {
        e.preventDefault();
        const data = { nome, email, whatsapp, city, uf, };
        //aqui ele já chama a api enviando um json da data
        try {
            const response = await api.post('ongs', data);
            //data é a resposta o id é o campo 
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma eajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/"> <FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={nome} onChange={e => setNome(e.target.value)} />
                    <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">

                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} style={{ width: 80 }} />

                    </div>
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}