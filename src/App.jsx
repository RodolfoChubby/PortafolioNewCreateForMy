import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from './assets/imagen1.jpg';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';


function App() {
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/RodolfoChubby/repos?type=public');
        const data = await response.json();
        setRepos(data);

        const totalReposCreated = data.length;
        const totalReposContributed = data.reduce((count, repo) => repo.fork ? count + 1 : count, 0);

        const contribData = [{
          name: 'Rodolfo de Jesus Nunez Berrelleza',
          username: 'RodolfoChubby',
          reposCreated: totalReposCreated,
          reposContributed: totalReposContributed
        }];
        setContributions(contribData);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    };

    const fetchWeather = async () => {
      try {
        const city = 'Obregon';
        const response = await fetch(`https://wttr.in/${city}?format=%t`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        console.log('Weather Data:', data);
        setTemperature(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
    fetchWeather();
  }, []);

  const skills = [
    { name: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Kiesel_logo.svg/640px-Kiesel_logo.svg.png' },
    { name: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: '', logo: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/java_original_wordmark_logo_icon_146459.png' },
    { name: '', logo: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/csharp_plain_logo_icon_146577.png' },
    { name: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { name: '', logo: 'https://angular.io/assets/images/logos/angular/angular.svg' },
    { name: '', logo: 'https://www.selectdistinct.co.uk/wp-content/uploads/2023/03/SQL_Server_Logo-removebg-preview.png' },
    { name: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-none d-lg-block" href="#">Rodolfo de Jesus Nunez Berrelleza</a>
          <a className="navbar-brand d-lg-none" href="#">Rodolfo Nuñez</a>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link disabled" aria-current="page" href="#"></a>
              </li>
            </ul>
          </div>
          <span className="navbar-text d-flex align-items-center position-absolute end-0 me-3">
            {loading ? (
              <span>Loading weather...</span>
            ) : (
              <span>Temperatura de Obregon: {temperature}</span>
            )}
          </span>
        </div>
      </nav>

      <div className="container mt-3">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 text-center text-md-start">
            <h2>¿Quién soy yo?</h2>
            <p>
              Suelo ser una persona entusiasta que esta dispuesto a darlo todo por un proyecto,
              me considero una persona que sabe trabajar en equipo,
              todo el conocimiento que tengo es gracias a mi profesor Miguel.
              En la siguiente foto podemos ver lo felices que somos juntos, ah, y César.
            </p>
          </div>
          <div className="col-md-5 text-center mb-3 mb-md-0">
            <img src={imagen1} alt="Imagen" className="img-fluid" />
          </div>
        </div>
      </div>


      <div className="container mt-5">
        <h3>Mis Habilidades</h3>
        <Row>
          {skills.map((skill) => (
            <Col xs={6} md={4} lg={3} className="mb-4 d-flex justify-content-center" key={skill.name}>
              <div className="skill-bubble text-center">
                <img src={skill.logo} alt={skill.name} className="img-fluid mb-2" style={{ maxWidth: '100px', height: 'auto' }} />
                <div>{skill.name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="container mt-4">
        <br />
        <h3>Proyectos Desarrollados</h3>
        <p>
          Estos son algunos de los proyectos realizados en mi estadía en la Universidad Tecnológica del Sur de Sonora, donde
          cursé mi Ingeniería en Desarrollo y Gestión de Software Multiplataforma.
        </p>
        <div className="container mt-5">
          <h3>Contribuciones</h3>
          <Table className="custom-table" striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nombre de Usuario</th>
                <th>Repositorios Creados</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contrib, index) => (
                <tr key={index}>
                  <td>{contrib.name}</td>
                  <td>{contrib.username}</td>
                  <td>{contrib.reposCreated}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <br />
        <Row className="d-none d-md-flex">
          {repos.map((repo) => (
            <Col md={4} key={repo.id} className="mb-3">
              <Card className="custom-shadow">
                <Card.Body>
                  <Card.Title>{repo.name}</Card.Title>
                  <Card.Text>
                    {repo.description || 'No description available.'}
                  </Card.Text>
                  <Card.Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    Visitar Repositorio
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Table className="d-md-none custom-table" striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Repositorio</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description || 'No description available.'}</td>
                <td>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Visitar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>



      <div className="container my-5">
        <h3>Transcurso Personal</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <h4 className="timeline-title">Primaria</h4>
              <p>Acudi a la primaria Jaime Nuno.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <h4 className="timeline-title">Secundaria</h4>
              <p>Acudi a la secundaria General #3, donde obtuve conociminetos basicos de electricidad.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <h4 className="timeline-title">Preparatoria</h4>
              <p>
                Acudi a la preparatoria Cbtis #37, donde obtuve conocimientos intermedios-Avanzados sobre
                electronica y programacion orientada a objetos.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <h4 className="timeline-title">Universidad</h4>
              <p>
                Estoy acudiendo actualmente a la Universidad Tecnologica del sur de Sonora (UTS), donde 
                estoy puliendo mis habilidades de programacion web.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <h4 className="timeline-title">Trabajo Actual</h4>
              <p>
                Actualmente trabajo en el IMSS en el area de Coordinación de Información y Análisis Estratégico, 
                desenvolviendome como desarrollador web.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
