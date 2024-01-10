import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import TransactionIO from '../components/TransactionData';

const BlockDetails = () => {
  const { block } = useParams();

  const [blockData, setBlockData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlockData = async () => {
    try {
      const blockData =
        block.length === 64
          ? await axios.get(`/block/hash/${block}`)
          : await axios.get(`/block/height/${Math.abs(block)}`);

      if (blockData?.data) setBlockData(blockData.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlockData();
  }, [block]);
  console.log(blockData);

  return (
    <Container className="my-5">
      {loading ? (
        <Spinner animation="border" />
      ) : blockData && blockData.block ? (
        <>
          <h2>Block Details</h2>
          <p>
            <strong>Hash:</strong> {blockData.block.hash}
          </p>
          <p>
            <strong>Confirmations:</strong> {blockData.block.confirmations}
          </p>
          <p>
            <strong>Height:</strong> {blockData.block.height}
          </p>
          <p>
            <strong>Time:</strong> {new Date(blockData.block.time * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Transactions Number:</strong>
            {blockData.block.nTx}
          </p>

          <h2>Transactions</h2>
          {blockData.txList.map((transactionData, index) => (
            <div key={index} className="my-5">
              <h3>Transaction {index + 1}</h3>
              <TransactionIO transactionData={transactionData} />
            </div>
          ))}
        </>
      ) : (
        <h2>Invalid block, enter valid block height or hash</h2>
      )}
    </Container>
  );
};

export default BlockDetails;
