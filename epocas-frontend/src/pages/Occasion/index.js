import React, { useEffect, useState } from "react";

// import { Container } from './styles';
import { Card, CardTitle, Navbar, Container } from "../../styles";
import Grid from "styled-components-grid";
import { Margin } from "styled-components-spacing";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export const Occasion = props => {
  const { id } = useParams();
  const [occasion, setOccasion] = useState([]);

  useEffect(() => {
    async function handleOccasion() {
      try {
        const response = await api.get("api/occasions/" + id);

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
      const [sDay, sMonth, sYear] = occasion.start_at.split("-");
      const [eDay, eMonth, eYear] = occasion.end_at.split("-");

      var startDate = new Date(sYear, sMonth, sDay);
      var endDate = new Date(eYear, eMonth, eDay);

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        console.log(d.getDay());
      }
    }

    populateCalendar();
  }, [occasion]);

  return (
    <Container>
      <Navbar>{occasion.name}</Navbar>
      <Grid>
        <Grid.Unit size={1}>
          <Margin top={5} horizontal={5}>
            <Card>
              <CardTitle>{occasion.name}</CardTitle>
              <Grid></Grid>
            </Card>
          </Margin>
        </Grid.Unit>
      </Grid>
    </Container>
  );
};
