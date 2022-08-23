import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  rowCenter,
  rowGap,
  SELECT_TEXT,
} from "../../styles/decorators";
import packageJson from "../../../package.json";
import type { TMenuKey } from "./config";
import {
  MENU_KEYS,
  ICON,
} from "./config";
import { useContext } from "../../state/Context";
import { nameToTitle } from "../../utils";
import {
  textLgCss,
  textMdCss,
  textSmCss,
} from "../../styles/text";
import {
  GAP,
  GAP_025,
  GAP_05,
  GLASS_GREY,
  GLASS_PURPLE,
  GLASS_PURPLE_0125,
  GLASS_PURPLE_BORDER,
  GLASS_PURPLE_09,
  GLASS_WHITE,
  GLASS_WHITE_02,
  GLASS_WHITE_BORDER,
  GLASS_BLACK,
  HEADER_HEIGHT,
  GAP_2,
  GAP_4,
} from "../../styles/constants";
import { GLASS_CSS } from "../../styles/glass";
import { css } from "@emotion/react";

const buttonCss = css`
  padding: ${GAP_025}px ${GAP_05}px;
`;

const Root = styled.header`
  ${GLASS_CSS}
  ${rowGap}
  background-image: radial-gradient(
      ellipse at top,
      ${GLASS_PURPLE},
      transparent
    ),
    radial-gradient(
      ellipse at bottom,
      ${GLASS_WHITE_02},
      transparent
    );
  border-bottom: ${GLASS_PURPLE_BORDER};
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: ${GAP}px ${GAP * 1.75}px;
  z-index: 1;
`;

const TitleButton = styled(
  motion.button
)`
  ${buttonCss}
  position: relative;
`;

const Title = styled(motion.h1)`
  ${textLgCss}
  position: relative;
  z-index: 1;
`;

const Row = styled(motion.div)`
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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Button = styled(motion.button)`
  ${rowGap}
  ${buttonCss}
  position: relative;
  z-index: 1;
`;

const Label = styled(motion.span)`
  ${rowCenter}
  ${textSmCss}
  text-shadow:
   -1px -1px 0 ${GLASS_PURPLE},  
    1px -1px 0 ${GLASS_PURPLE},
    -1px 1px 0 ${GLASS_PURPLE},
     1px 1px 0 ${GLASS_PURPLE};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${GLASS_PURPLE_0125};
  & path {
    stroke: ${GLASS_PURPLE_09};
    stroke-width: 2;
  }
`;

export const Header = () => {
  const { menu, dispatch } =
    useContext();
  const selected = (
    <Selected
      layoutId="Selected"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backgroundColor: menu
          ? GLASS_PURPLE_09
          : GLASS_PURPLE_0125,
        border: menu
          ? GLASS_PURPLE_BORDER
          : GLASS_WHITE_BORDER,
      }}
      exit={{
        opacity: 0,
      }}
    />
  );

  return (
    <Root>
      <Row
        onTap={() =>
          dispatch({
            type: "menu",
            value: null,
          })
        }
      >
        <TitleButton {...SELECT_TEXT}>
          <Title className="--title">
            {nameToTitle(
              packageJson.name
            )}
          </Title>
          {!menu && selected}
        </TitleButton>
      </Row>
      <RowList>
        {MENU_KEYS.map(
          (key: TMenuKey) => {
            const icon = ICON[key];
            const isActive =
              menu === key && icon;
            return (
              <Item key={key}>
                {isActive && selected}
                <Button
                  {...SELECT_TEXT}
                  onTap={() =>
                    dispatch({
                      type: "menu",
                      value: isActive
                        ? null
                        : key,
                    })
                  }
                >
                  <Label className="--value">
                    {icon} {key}
                  </Label>
                </Button>
              </Item>
            );
          }
        )}
      </RowList>
    </Root>
  );
};
