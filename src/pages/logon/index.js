import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './style.css';
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';


export default function Logon(){
  const [id,setID] = useState('');
  const history = useHistory();

async  function handleLogon(e){
    e.preventDefault();
    try{
      const response = await api.post('sessions', {id});

      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);
      
      history.push('/profile');

    }catch(err){
      alert("Falha no login. Tente novamente");

    }
  }


  return(

      <div className="logon-container">
          <section className="form">
              <img src={logoImg} alt="logo"/>

              <form onSubmit={handleLogon}>
                <h1>Faça seu Logon</h1>
                <input 
                placeholder="Sua ID"
                value={id}
                onChange = {e => setID(e.target.value)}
                />
                <button className="button"  type="submit">Entrar</button>

                <Link className='backlink' to="register">
                    <FiLogIn size={16} color="E02041"/>
                    Não tenho cadastro.
                </Link>

              </form>

          </section>

        <img src={heroesImg} alt="heroes"/>


      </div>

    );
}