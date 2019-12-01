import React, { useEffect, useState } from "react";

// import { Container } from './styles';
import { Container } from "../../styles";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import Reactotron from "reactotron-react-js";
import useModal from "react-hooks-use-modal";

export const Occasion = props => {
  const { id } = useParams();
  const [occasion, setOccasion] = useState([]);
  const [callendar, setCallendar] = useState([]);
  const [day, setDay] = useState([]);
  const [Modal, open, close] = useModal("root");
  const [DayModal, openDay, closeDay] = useModal("root");

  const addCallendar = date => {
    const newCallendar = [...callendar, { date }];
    setCallendar(newCallendar);
  };

  useEffect(() => {
    async function handleOccasion() {
      try {
        const response = await api.get("api/occasions/" + id);
        Reactotron.log(response);

        setOccasion(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Não foi possível fazer a query");
      }
    }
    handleOccasion();
  }, []);

  useEffect(() => {
    function populateCalendar() {
      if (occasion.start_at == null) return;

      const startDate = new Date(occasion.start_at);
      const endDate = new Date(occasion.end_at);

      let dates = [];

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates = [
          ...dates,
          {
            year: d.getFullYear(),
            month: d.getMonth(),
            day: d.getDay(),
            toString: d.toDateString()
          }
        ];
      }

      setCallendar(dates);
    }

    populateCalendar();
  }, [occasion]);

  function handleDayOpen(day, index) {}

  async function deleteOccasion() {
    try {
      await api.delete("api/occasions/" + occasion.id);
      props.history.push("/");
    } catch (err) {
      toast.error("Não foi possível remover a época");
    }
  }

  return (
    <Container>
      <DayModal>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Editar Dia
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeDay}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeDay}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </DayModal>
      <Modal>
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Remover {occasion.name}</h5>
              <button
                type="button"
                className="close"
                onClick={close}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Tem a certeza que deseja remover a época {occasion.name}?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteOccasion}
              >
                Remover
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-0 bg-primary">
          <li className="breadcrumb-item text-white">
            <a href="#" className="text-white">
              Home
            </a>
          </li>
          <li className="breadcrumb-item text-white">
            <a href="#" className="text-white">
              Épocas
            </a>
          </li>
          <li className="breadcrumb-item active text-white" aria-current="page">
            {occasion.name}
          </li>
        </ol>
      </nav>
      <div className="jumbotron jumbotron-fluid m-0 mb-5 bg-primary">
        <div className="container">
          <h1 className="display-4 text-white">
            {occasion.name}
            <div className="float-right row">
              <a
                href={occasion.id + "/edit"}
                className="btn btn-sm text-white btn-info mr-2"
              >
                Editar
              </a>
              <button
                className="btn btn-sm btn-danger text-white"
                onClick={open}
              >
                Remover
              </button>
            </div>
          </h1>

          <p className="lead text-white">{occasion.description}</p>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5">
          {callendar.map((day, index) => {
            if (occasion.days[index]) {
              return (
                <div
                  key={index}
                  className="col-sm-2"
                  onClick={() => {
                    this.handleDayOpen(occasion.days[index], index);
                  }}
                >
                  <div className="card text-center my-2 border-success">
                    <div className="card-body m-0">
                      <h5 className="m-0">Dia {index + 1}</h5>
                      <a href="#" class="stretched-link"></a>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="col-sm-2"
                  onClick={openDay}
                  onClick={() => {
                    this.handleDayOpen(
                      { occasion_id: occasion.id, date: day },
                      index
                    );
                  }}
                >
                  <div className="card text-center my-2 border-warning">
                    <div className="card-body m-0">
                      <h5 className="m-0">Dia {index + 1}</h5>
                      <a href="#" className="stretched-link"></a>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Container>
  );
};
