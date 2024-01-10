import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNumeric = !isNaN(search);

    if (search.startsWith('00000000')) {
      navigate(`/block/${search}`);
    } else if (isNumeric) {
      navigate(`/block/${search}`);
    } else {
      navigate(`/transaction/${search}`);
    }
  };

  return (
    <header>
      <Navbar
        expand="lg"
        collapseOnSelect
        className="navbar navbar-expand-lg bg-dark"
        data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link className="header-brand-name custom-link" to="/">
              BlockExplorer - TT
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
                <FormControl
                  type="search"
                  placeholder="Enter transaction, address, or block"
                  className="mx-3 search-input"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success" className="search-button" type="submit">
                  Search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
