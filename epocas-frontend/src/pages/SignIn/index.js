import React, { useState } from "react";

import { withRouter } from "react-router-dom";

import { Container, Form, Button, TextInput, Title } from "./styles";

import api from "../../services/api";
import { login } from "../../services/auth";
import { isAuthenticated } from "../../services/auth";

import { toast } from "react-toastify";

const SignIn = props => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (isAuthenticated()) {
    props.history.push("/app");
  }

  async function handleLogin() {
    const { email, password } = formData;
    console.log(email);
    if (!email || !password) {
      toast.error("Por favor preencha todos os campos!");

      return;
    }

    try {
      const response = await api.post("sessions", {
        email,
        password
      });
      login(response.data.token);
      props.history.push("/app");
    } catch (err) {
      console.log(err);
      toast.error("Problema na autenticação");
    }
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }

  return (
    <div>
      <Container>
        <Form>
          <Title>ÉPOCAS</Title>
          <TextInput
            type="email"
            id="email"
            placeholder="Endereço de e-mail"
            onChange={handleChange}
            value={formData.email}
          />

          <TextInput
            type="password"
            id="password"
            placeholder="Senha"
            onChange={handleChange}
            value={formData.password}
          />

          <Button onClick={handleLogin}>Login</Button>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(SignIn);
