import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Link } from 'react-router-dom';

import { Nav, Navbar, NavItem, NavbarText } from 'reactstrap';

function App() {
  return (
    <>
      <Navbar
         color="dark"
         container="fluid"
         dark
         expand="md"
      >
        <Link 
          to='/' 
          className='navbar-brand'>
          Tutorials App
        </Link>

        <Nav
          className="me-auto"
          pills
        >
          <NavItem>
            <Link 
              to='/tutorials'
              className='nav-link'>
              Tutorials
            </Link>
          </NavItem>

          <NavItem>
          <Link 
              to='/add'
              className='nav-link'>
              Add
            </Link>
          </NavItem>
        </Nav>

        <NavbarText>
          By BeRsErKer
        </NavbarText>
      </Navbar>
    </>
  );
}

export default App;
