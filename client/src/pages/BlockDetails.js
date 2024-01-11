import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Spinner, Container, Pagination } from 'react-bootstrap';
import TransactionIO from '../components/TransactionData';

const BlockDetails = () => {
  const { block } = useParams();

  const [blockData, setBlockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchBlockData = async (pageNumber) => {
    setLoading(true);
    try {
      const blockData =
        block.length === 64
          ? await axios.get(`/block/hash/${block}?page=${pageNumber}`)
          : await axios.get(`/block/height/${Math.abs(block)}?page=${pageNumber}`);

      if (blockData?.data) setBlockData(blockData.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchBlockData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    fetchBlockData(pageNumber);
  };

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
            <strong>Transactions Number:</strong> {blockData.block.nTx}
          </p>
          {blockData.block?.previousblockhash && (
            <p>
              <strong>Previous Block Hash:</strong>{' '}
              <Link to={`/block/${blockData.block.previousblockhash}`}>
                {blockData.block.previousblockhash}
              </Link>
            </p>
          )}
          {blockData.block?.nextblockhash && (
            <p>
              <strong>Next Block Hash:</strong>{' '}
              <Link to={`/block/${blockData.block.nextblockhash}`}>
                {blockData.block.nextblockhash}
              </Link>
            </p>
          )}

          <h2>Transactions</h2>
          <Pagination className="justify-content-center mt-5">
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
            {[...Array(blockData.totalPages).keys()].map((value, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === blockData.totalPages}
            />
          </Pagination>
          {blockData.txList.map((transactionData, index) => (
            <div key={index} className="mb-5">
              <h3>Transaction {index + 1 + (page - 1) * 10}</h3>

              <TransactionIO transactionData={transactionData} />
            </div>
          ))}

          <Pagination className="justify-content-center mt-5">
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
            {[...Array(blockData.totalPages).keys()].map((value, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === blockData.totalPages}
            />
          </Pagination>
        </>
      ) : (
        <h2>Invalid block, enter valid block height or hash</h2>
      )}
    </Container>
  );
};

export default BlockDetails;
