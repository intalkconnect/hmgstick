import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', plano: 'teste' });

  useEffect(() => {
    axios.get('http://localhost:8000/games').then(res => setGames(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/users', form);
    alert('Usuário criado com sucesso');
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder='Username' onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder='Password' type='password' onChange={e => setForm({ ...form, password: e.target.value })} />
        <select onChange={e => setForm({ ...form, plano: e.target.value })}>
          <option value='teste'>Teste (24h)</option>
          <option value='30d'>30 dias</option>
          <option value='6m'>6 meses</option>
          <option value='12m'>12 meses</option>
        </select>
        <button type='submit'>Cadastrar</button>
      </form>

      <h2>Jogos disponíveis</h2>
      <ul>
        {games.map(g => (
          <li key={g.id}>
            {g.name} <br />
            <img src={g.thumbnail_url} width='120' alt={g.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
