import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import Reactotron from "reactotron-react-js";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import * as moment from "moment";

const schema = Yup.object().shape({
  sentence: Yup.string().required(),
  sentence_author: Yup.string().required(),
  pray: Yup.string().required(),
  image: Yup.mixed().required("É necessário um ficheiro")
});

export const DayForm = props => {
  const [day, setDay] = useState({});
  useEffect(() => {
    setDay(props.day);
  }, []);

  function handleSubmit(data) {
      if(day['id'] == null) {
          try {
            const response = await api.post('/api/days', {data, ...day});
            const imgResponse = await api.post('/api/days/'  + response.data.id  + "/image", {image: data['image']});
            console.log(response.data);
          } catch(err) {
              console.log(err);
          }
      } else {
        try {
            const response = await api.put('/api/days', {data});
            const imgResponse = await api.put('/api/days/'  + response.data.id + "/image" , {image: data['image']});
            console.log(response.data);
          } catch(err) {
              console.log(err);
          }
      }
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit} initialData={day}>
      <div className="form-group">
        <label>Refleção</label>
        <Input multiline name="sentence" className="form-control" />
      </div>
      <div className="form-group">
        <label>Autor da Refleção</label>
        <Input name="sentence_author" className="form-control" />
      </div>

      <div className="form-group">
        <label>Oração</label>
        <Input multiline name="pray" className="form-control" />
      </div>

      <div className="form-group">
        <label>Imagem</label>
        <FileInput name="image" className="form-control" />
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </Form>
  );
};
