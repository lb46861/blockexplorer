import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TransactionIO = ({ transactionData }) => {
  return (
    <Card className="my-5">
      <Card.Body>
        <Row>
          <Col>
            {transactionData.vIns.map((input, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>Input {index + 1}</Card.Title>
                  <Card.Text>Address: {input.address}</Card.Text>
                  <Card.Text>Value: {input.value}</Card.Text>
                  {input.txId && (
                    <Card.Text>
                      Transaction ID: <Link to={`/transaction/${input.txId}`}>{input.txId}</Link>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            {transactionData.vOuts.map((output, index) => (
              <Card key={index} className="mb-2">
                <Card.Body>
                  <Card.Title>Output {index + 1}</Card.Title>
                  <Card.Text>Address: {output.address}</Card.Text>
                  <Card.Text>Value: {output.value}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

TransactionIO.propTypes = {
  transactionData: PropTypes.object.isRequired
};

export default TransactionIO;
