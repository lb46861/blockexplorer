import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Container } from 'react-bootstrap';

const HomePage = () => {
  const [blockData, setBlockData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestBlocks = async () => {
    try {
      const blockData = await axios.get(`/block/lastfiveblocks`);
      setBlockData(blockData.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestBlocks();
  }, []);

  return (
    <>
      <Container>
        <h1 className="my-4">Latest blocks</h1>
        {loading ? (
          <>
            <Spinner animation="border" role="status"></Spinner>
            <p>Please wait, this can take some time...</p>
          </>
        ) : (
          <Table striped bordered hover className="block-data-table">
            <thead>
              <tr>
                <th>Height</th>
                <th>Confirmations</th>
                <th>Block Time</th>
                <th>N/O Trans</th>
                <th>Total Sent</th>
                <th>Total Fees</th>
                <th>Size Bytes</th>
              </tr>
            </thead>
            <tbody>
              {blockData.map((block, index) => (
                <tr key={index}>
                  <td>{block.height}</td>
                  <td>{block.confirmations}</td>
                  <td>{new Date(block.age).toLocaleString()}</td>
                  <td>{block.nTx}</td>
                  <td>{block.totalSent} BTC</td>
                  <td>{block.totalFees} BTC</td>
                  <td>{block.size}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default HomePage;
