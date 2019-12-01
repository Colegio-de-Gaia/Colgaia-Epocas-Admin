import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Container } from "../../styles/";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Reactotron from "reactotron-react-js";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import * as moment from "moment";
import ReactDatePicker from "../../components/DatePicker";

export const EditOccasion = props => {
  const { id } = useParams();
  const [occasion, setOccasion] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Este parâmetro é obrigatório")
      .min(4, "O mínimo de carateres permitidos é 4")
      .max(60, "Apenas são permitidos 60 carateres"),
    description: Yup.string()
      .required("Este parâmetro é obrigatório")
      .min(60, "O mínimo de carateres permitidos é 60"),
    start_at: Yup.date()
      .required()
      .default(moment(new Date(occasion.start_at)))
      .typeError("Este campo é obrigatório"),
    end_at: Yup.date()
      .required()
      .typeError("Este campo é obrigatório")
      // ? This is the same as an if statement
      // ? The end_at date at should be higher
      // ? than the start_at date, so we use .min
      .min(Yup.ref("start_at"))
  });

  useEffect(() => {
    async function handleOccasion() {
      try {
        const response = await api.get("/api/occasions/" + id);
        // * We create this variable 'cause we're lazy
        const responseData = response.data;

        // ? This is the data format we'll be using
        // ? better get used to it, or you'll have
        // ? a really hard time changing it all
        const dateFormat = "YYYY-MM-DD";

        setStart(moment(new Date(responseData.start_at)).format(dateFormat));
        setEnd(moment(new Date(responseData.end_at)).format(dateFormat));

        setOccasion(responseData);
      } catch (error) {
        console.log(error);
        toast.error("Não foi possível fazer a query");
      }
    }

    handleOccasion();
  }, []);

  async function handleSubmit(data) {
    try {
      await api.put("/api/occasions/" + occasion.id, data);
      props.history.push("../../occasion/" + occasion.id);
    } catch (error) {
      toast.error("Não foi possível editar");
    }
  }

  return (
    <Container>
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
          <li className="breadcrumb-item text-white" aria-current="page">
            <a href="#" className="text-white">
              {occasion.name}
            </a>
          </li>
          <li className="breadcrumb-item active text-white" aria-current="page">
            Editar
          </li>
        </ol>

        <div className="container">
          <div className="card my-5">
            <div className="card-body">
              <h5 className="card-title">Editar {occasion.name}</h5>
              <p className="card-text mb-4">
                Preencha o formulário para editar uma nova época
              </p>

              <Form
                schema={schema}
                onSubmit={handleSubmit}
                initialData={{
                  name: occasion.name,
                  description: occasion.description,
                  start_at: start,
                  end_at: end
                }}
              >
                <div className="form-group">
                  <label>Nome</label>
                  <Input name="name" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Descrição</label>
                  <Input
                    multiline
                    name="description"
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="form-group col-4">
                    <label>Data inicio</label>
                    <br></br>
                    <Input
                      type="date"
                      name="start_at"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group col-4">
                    <label>Data final</label>
                    <br></br>
                    <Input type="date" name="end_at" className="form-control" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </Form>
            </div>
          </div>
        </div>
      </nav>
    </Container>
  );
};
