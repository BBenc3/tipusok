import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "https://localhost:5001/api";

function Home() {
  const [tipusok, setTipusok] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/Tipusok`).then((response) => {
      setTipusok(response.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h4>Tipusok</h4>
      <ul className="list-group">
        {tipusok.map((tipus) => (
          <li key={tipus.id} className="list-group-item">
            <Link to={`/tipus/${tipus.id}`} className="text-decoration-none">{tipus.megnevezes}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TipusDetails() {
  const { id } = useParams();
  const [tipus, setTipus] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/Tipusok/${id}`).then((response) => {
      setTipus(response.data);
    });
  }, [id]);

  if (!tipus) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <h4>{tipus.megnevezes}</h4>
      <p>{tipus.leiras}</p>
      {tipus.kepek && <img src={tipus.kepek} alt={tipus.megnevezes} className="img-fluid" />}
    </div>
  );
}

function NewTipus() {
  const [megnevezes, setMegnevezes] = useState("");
  const [leiras, setLeiras] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/UjTipusok`, { megnevezes, leiras, kepek: null }).then(() => {
      alert("Tipus hozzáadva!");
    });
  };

  return (
    <div className="container mt-4">
      <h4>Új Típus Felvitele</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" value={megnevezes} onChange={(e) => setMegnevezes(e.target.value)} placeholder="Megnevezés" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" value={leiras} onChange={(e) => setLeiras(e.target.value)} placeholder="Leírás" required />
        </div>
        <button type="submit" className="btn btn-primary">Hozzáadás</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Tipusok Kezelése</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Főoldal</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/uj-tipus">Új Típus</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tipus/:id" element={<TipusDetails />} />
          <Route path="/uj-tipus" element={<NewTipus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
