import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  
  margin: 2rem 0 auto 0;
  text-align: center;
`;


const home = () => {
  return (
    <Styles>
      <Container fluid>
        <Row className="justify-content-md-center" >
          <Col xs={{ span: 6 }}><h3>Welcome to Gerdau!</h3></Col>
          <Col xs={{ span: 12 }}>
            <p>Click <a href='/new'>here</a> to add a new machine</p>
          </Col>
          <Col xs={{ span: 12 }}>
            <p>Click <a href='/list'>here</a> to list all machines</p>
          </Col>
        </Row>
      </Container>
      </Styles>
  )
}

export default home;