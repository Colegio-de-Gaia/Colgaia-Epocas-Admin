import React from "react";

import { Container } from "../../styles";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";

import * as Yup from "yup";
import api from "../../services/api";

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
    .typeError("Este campo é obrigatório"),
  end_at: Yup.date()
    .required()
    .typeError("Este campo é obrigatório")
    .min(Yup.ref("start_at"))
});

export const CreateOccasion = props => {
  async function handleSubmit(data) {
    try {
      const response = await api.post("api/occasions", data);
      props.history.push("/occasion/" + response.data.id);
    } catch (err) {
      toast.error("Ocorreu um erro");
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
          <li className="breadcrumb-item active text-white" aria-current="page">
            Nova Época
          </li>
        </ol>

        <div className="container">
          <div className="card my-5">
            <div className="card-body">
              <h5 className="card-title">Nova Época</h5>
              <p className="card-text mb-4">
                Preencha o formulário para adicionar uma nova época
              </p>

              <Form schema={schema} onSubmit={handleSubmit}>
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
                  <div className="form-group col-6">
                    <label>Data de início</label>
                    <Input
                      type="date"
                      name="start_at"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label>Data final</label>
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
