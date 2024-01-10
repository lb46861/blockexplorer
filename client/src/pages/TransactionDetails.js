import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import TransactionIO from '../components/TransactionData';

const TransactionDetails = () => {
  const { txId } = useParams();

  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTransactionData = async () => {
    try {
      const transactionData = await axios.get(`/transaction/${txId}`);
      if (transactionData?.data?.data) setTransactionData(transactionData.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [txId]);

  return (
    <Container className="my-5">
      {loading ? (
        <Spinner animation="border" />
      ) : transactionData ? (
        <>
          <Row className="my-5">
            <Col>
              <h2>Transaction Details</h2>
              <p>
                <strong>Hash:</strong> {transactionData.hash}
              </p>
              <p>
                <strong>Block Hash:</strong> {transactionData.blockHash}
              </p>
              <p>
                <strong>Confirmations:</strong> {transactionData.confirmations}
              </p>
              <p>
                <strong>Fee:</strong> {transactionData.fee}
              </p>
              <p>
                <strong>Received Date:</strong> {transactionData.receivedDate}
              </p>
              <p>
                <strong>Amount:</strong> {transactionData.amount}
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3>Inputs</h3>
            </Col>

            <Col>
              <h3>Outputs</h3>
            </Col>
          </Row>

          <TransactionIO transactionData={transactionData} />
        </>
      ) : (
        <h2>Invalid transaction id, enter valid txId</h2>
      )}
    </Container>
  );
};

export default TransactionDetails;
