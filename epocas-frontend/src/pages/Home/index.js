import React, { useState, useEffect } from "react";
import { Container } from "../../styles";
import { toast } from "react-toastify";

import api from "../../services/api";
import Reactotron from "reactotron-react-js";

export const Home = props => {
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    handleOccasions();
  }, []);

  async function handleOccasions() {
    try {
      const response = await api.get("api/occasions");

      Reactotron.log(response);

      setOccasions(response.data);
    } catch (err) {
      toast.error("Não foi possivel ler as épocas");
      setOccasions({});
    }
  }

  function redirectOccasion(id) {
    return props.history.push("/occasion/" + id);
  }

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb m-0 bg-primary">
            <li
              className="breadcrumb-item active text-white"
              aria-current="page"
            >
              Home
            </li>
          </ol>
        </nav>
      </nav>
      <div className="container">
        <div className="card my-5">
          <div className="card-body">
            <h5 className="card-title">
              Épocas
              <a
                href="/occasion/create"
                className="btn btn-primary float-right"
              >
                Nova época
              </a>
            </h5>

            <p className="card-text">Lista das épocas criadas</p>

            <div className="list-group mb-5">
              {occasions.map((occasion, index) => {
                return (
                  <a
                    onClick={redirectOccasion.bind(this, occasion.id)}
                    href=""
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{occasion.name}</h5>
                      <small>Criado em: {occasion.created_at}</small>
                    </div>
                    <p className="mb-1 text-truncate">{occasion.description}</p>
                    <small>
                      <strong>Inicio:</strong>
                      {new Date(occasion.start_at).toLocaleDateString()}
                    </small>
                    <small className="ml-3">
                      <strong>Fim:</strong>
                      {new Date(occasion.end_at).toLocaleDateString()}
                    </small>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
