import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../../templates/Container";
import { Title } from "./Title";
import { Cross } from "./Cross";

const Root = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #424242;
  margin-top: 20px;
  z-index: 1;
`;

const Row = styled.header`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
`;

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Root>
      <Container>
        {false ? (
          <Button>
            <Row>
              <Cross />
              <Title />
            </Row>
          </Button>
        ) : null}
      </Container>
    </Root>
  );
};
