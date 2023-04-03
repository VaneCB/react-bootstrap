import { Container } from "react-bootstrap";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Menu />
      <Container fluid="">
        <Outlet />
      </Container>
    </>
  );
}
