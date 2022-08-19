import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  columnEnd,
  rowGap,
} from "../../styles/decorators";
import packageJson from "../../../package.json";
import type { TMenuKey } from "./config";
import { MENU_KEYS } from "./config";
import { useContext } from "../../state/Context";
import { nameToTitle } from "../../utils";
import {
  textLgCss,
  textMdCss,
} from "../../styles/text";
import { GAP } from "../../styles/constants";
import { RECORD } from "./menu";

const Root = styled.header`
  ${rowGap}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${GAP}px;
  z-index: 1;
`;

const Title = styled.h1`
  ${textLgCss};
`;

const Row = styled.div`
  ${rowGap}
`;

const RowList = styled.ul`
  ${rowGap}
`;

const Item = styled(motion.li)`
  ${columnEnd}
  margin-right: ${GAP}px;
  &:last-child {
    margin-right: 0;
  }
`;

const Button = styled(motion.button)`
  ${rowGap}
`;

const Text = styled(motion.span)`
  ${textMdCss}
`;

export const Header = () => {
  const { active, dispatch } =
    useContext();
  console.log(active);
  return (
    <Root>
      <Row>
        <Title className="--title">
          {nameToTitle(
            packageJson.name
          )}
        </Title>
      </Row>
      <RowList>
        {MENU_KEYS.map(
          (key: TMenuKey) => (
            <Item key={key}>
              <Button
                initial={false}
                style={{ opacity: 1 }}
                whileHover={{
                  opacity: 0.8,
                }}
                onTap={() => {
                  console.log("tap");
                  console.log(dispatch);

                  dispatch({
                    type: "active",
                    value: {
                      [key]: true,
                    },
                  });
                }}
              >
                <Text>{key}</Text>
              </Button>
              {active[key] &&
                RECORD[key]}
            </Item>
          )
        )}
      </RowList>
    </Root>
  );
};
