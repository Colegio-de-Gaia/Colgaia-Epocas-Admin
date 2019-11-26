import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  body {
    font-family: 'Roboto', sans-serif;  
    margin: 0;
    background-color: #efe6e1;
    flex-grow: 1;
  }
`;

export const Navbar = styled.div`
  background-color: #155e37;
  height: 7vh;
  display: flex;
  align-items: center;

  color: white;
  font-weight: bold;
  font-size: 2rem;
  padding: 0 10%;

  box-shadow: -3px 7px 36px -15px rgba(0, 0, 0, 0.62);
`;

export const Card = styled.div`
  background: white;
  padding: 25px 50px;
  border-radius: 5px;
  border: 2px solid #dedede;
`;

export const CardTitle = styled.h2`
  color: #155e37;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const SmallCard = styled.div`
  background: white;
  min-height: 10vh;
  padding: 0px 25px;
  border-radius: 5px;
  border: 2px solid #dedede;
  cursor: pointer;
`;

export const SmallCardTitle = styled.h2`
  color: #155e37;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const Muted = styled.p``;

export const Container = styled.div``;
