
import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';


export default function NewIncidents() {
    const [titulo, setTitulo] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            titulo,
            description,
            value,
        };
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso,tente novamente.')

        }

    }
    return (

        <div className="new-incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form>
                    <input placeholder="Título do caso" value={titulo} onChange={e => (setTitulo(e.target.value))} />
                    <textarea placeholder="Descrição" value={description} onChange={e => (setDescription(e.target.value))} />
                    <input placeholder="Valor em reais" value={value} onChange={e => (setValue(e.target.value))} />
                    <button onClick={handleNewIncident} className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}