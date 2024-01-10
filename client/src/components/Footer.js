import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark">
      <Container>
        <Row>
          <Col>
            <ul className="list-unstyled mb-0 m-2 d-flex flex-row justify-content-center align-items-center">
              <li className="px-3">
                <p
                  className="text-decoration-none nav-link"
                  style={{
                    color: '#fff'
                  }}>
                  {' '}
                  BlockExplorer - TT
                </p>
              </li>

              <li className="px-3">
                <p
                  className="text-decoration-none nav-link"
                  style={{
                    color: '#fff'
                  }}>
                  {' '}
                  lb46861@oss.unist.hr
                </p>
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col
            className="text-center pb-2"
            style={{
              color: '#fff'
            }}>
            Copyright &copy; BlockeExplorer - Begovic
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
