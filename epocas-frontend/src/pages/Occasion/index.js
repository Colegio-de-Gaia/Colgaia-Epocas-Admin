import React, { useEffect, useState } from "react";

// import { Container } from './styles';
import {
  Card,
  CardTitle,
  Navbar,
  Container,
  SmallCard,
  SmallCardTitle,
  Muted
} from "../../styles";
import Grid from "styled-components-grid";
import { Margin } from "styled-components-spacing";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export const Occasion = props => {
  const { id } = useParams();
  const [occasion, setOccasion] = useState([]);
  const [callendar, setCallendar] = useState([]);

  const addCallendar = date => {
    const newCallendar = [...callendar, { date }];
    setCallendar(newCallendar);
  };

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
      const startDate = new Date(sYear, sMonth - 1, sDay);
      const endDate = new Date(eYear, eMonth - 1, eDay);

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
      console.log(dates);
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
              <Grid>
                {callendar.map((value, index) => {
                  return (
                    <Grid.Unit size={1 / 4}>
                      <Margin right={3} bottom={3}>
                        <SmallCard key={index}>
                          <SmallCardTitle>Dia {index + 1}</SmallCardTitle>
                          <Muted>{value.toString}</Muted>
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
