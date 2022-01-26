import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarText } from 'reactstrap';

function App() {
  return (
    <>
      <Navbar
         color="dark"
         container="fluid"
         dark
         expand="md"
      >
        <NavbarBrand to="/">
            Tutorials App
        </NavbarBrand>

        <Nav
          className="me-auto"
          pills
        >
          <NavItem>
            <NavLink
              active
            >
              Tutorials
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              Add
            </NavLink>
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
