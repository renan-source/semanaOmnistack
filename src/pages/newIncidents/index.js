import React,{useState}from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){

    const ongid = localStorage.getItem('ongID');

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value,setValue] = useState('');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('/incidents', data, {
                headers:{
                    Authorization: ongid,
                }
            });
            history.push('/profile');

        }catch{
            alert("Erro ao cadastrar um incidente. Tente novamente.");
        }
    }

    return(
        <div className='newIncident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver!</p>

                    <Link className='backlink' to="/profile">
                    <FiArrowLeft size={16} color="E02041"/>
                    Voltar para home
                </Link>   
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder ='Título do caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder ='Descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    <input 
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />
                    
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>

        </div>
    )
}