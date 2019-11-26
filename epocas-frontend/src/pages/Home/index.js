import React, { useState, useEffect } from "react";
import api from "../../services/api";

import { toast } from "react-toastify";
import { Container } from "./styles";
import {
  Card,
  CardTitle,
  SmallCard,
  SmallCardTitle,
  Navbar,
  Muted
} from "../../styles";
import Grid from "styled-components-grid";
import { Margin } from "styled-components-spacing";

export const Home = props => {
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    handleOccasions();
  }, []);

  async function handleOccasions() {
    try {
      const response = await api.get("api/occasions");
      console.log(response.data);
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
      <Navbar>Home</Navbar>
      <Grid>
        <Grid.Unit size={1}>
          <Margin top={5} horizontal={5}>
            <Card>
              <CardTitle>Épocas</CardTitle>
              <Grid>
                {occasions.map((value, index) => {
                  return (
                    <Grid.Unit key={index} size={1 / 4}>
                      <Margin right={2}>
                        <SmallCard
                          onClick={redirectOccasion.bind(this, value.id)}
                        >
                          <SmallCardTitle>{value.name}</SmallCardTitle>
                          <Muted>
                            {value.start_at} - {value.end_at}
                          </Muted>
                        </SmallCard>
                      </Margin>
                    </Grid.Unit>
                  );
                })}
              </Grid>
            </Card>
          </Margin>
        </Grid.Unit>
      </Grid>
    </Container>
  );
};
