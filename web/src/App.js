import React, { useState, useEffect } from 'react';
import api from './services/Api';
import './global.css';
import './app.css';
import './sideBar.css';
import './Main.css';



function App() {
  const [devs, setDev] = useState([]);
  const [latitude, setLatitude] = useState(''); //cria variavel e atualiza pelo useState
  const [longitude, setLongitude] = useState('');
  const [github_name, setGitHUb] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLongitude(longitude);
      setLatitude(latitude);
    }, (err) => {
      console.log(err);
    }, {
      timeout: 30000,
    }); }, []);

  useEffect(() => {
    async function loadDev() {
      const response = await api.get('/devs');
      setDev(response.data);
    }
    loadDev();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();
    const response = api.post('/devs', {
      github_name,
      techs,
      longitude,
      latitude
    });
    setGitHUb(''); //limpa campos
    setTechs('');
    setDev([...devs, response.data]);
    
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_name">Usuário do GitHub</label>
            <input
              name="github_name"
              id="github_name"
              required
              value={github_name}
              onChange={e => setGitHUb(e.currentTarget.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.currentTarget.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type='Number'
                name="latitude"
                id="latitude"
                required value={latitude}
                onChange={e => setLatitude(e.currentTarget.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type='Number'
                name="longitude"
                id="longitude"
                required value={longitude}
                onChange={e => setLongitude(e.currentTarget.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.github_name}></img>
                <div className="user-info">
                  <strong>{dev.name}</strong>                  
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_name}`}>Link para GitHub</a>
            </li>
          ))}
        </ul>
      </main>
    </div>

  );
}

export default App;
