import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  columnEnd,
  rowCenter,
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
import {
  GAP,
  GAP_025,
  GAP_05,
  GLASS_BLUE,
  GLASS_BORDER,
  GLASS_PURPLE,
  GLASS_PURPLE_BORDER,
  GLASS_PURPLE_DARK,
  GLASS_WHITE,
} from "../../styles/constants";
import { GLASS_CSS } from "../../styles/glass";
import { centerSelfCss } from "../../styles/position";

const Root = styled.header`
  ${GLASS_CSS}
  ${rowGap}
  /* border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px; */
  background-image: radial-gradient(
      ellipse at top,
      ${GLASS_PURPLE},
      transparent
    ),
    radial-gradient(
      ellipse at bottom,
      ${GLASS_WHITE},
      transparent
    );
  /* background-color: rgba(
    255,
    255,
    255,
    0.2
  ); */
  border-bottom: ${GLASS_PURPLE_BORDER};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${GAP}px ${GAP * 1.75}px;
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
  ${rowCenter}
  position: relative;
  margin-right: ${GAP}px;
  &:last-child {
    margin-right: 0;
  }
`;

const Selected = styled(motion.div)`
  ${GLASS_CSS}
  background-color: ${GLASS_PURPLE_DARK};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Button = styled(motion.button)`
  ${rowGap}
  position: relative;
  padding: ${GAP_025}px ${GAP_05}px;
  z-index: 1;
`;

const Text = styled(motion.span)`
  ${textMdCss}
`;

export const Header = () => {
  const { menu, active, dispatch } =
    useContext();
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
          (key: TMenuKey) => {
            const isActive =
              menu === key;
            return (
              <Item key={key}>
                {isActive && (
                  <Selected
                    key={key}
                    layoutId="Selected"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  />
                )}
                <Button
                  initial={false}
                  style={{ opacity: 1 }}
                  whileHover={{
                    opacity: 0.8,
                  }}
                  onTap={() =>
                    dispatch({
                      type: "menu",
                      value: isActive
                        ? null
                        : key,
                    })
                  }
                >
                  <Text>{key}</Text>
                </Button>
              </Item>
            );
          }
        )}
      </RowList>
    </Root>
  );
};
