import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../../../../../../state/Context";
import {
  GLASS_PURPLE_09,
  ICON_SIZE,
} from "../../../../../../styles/constants";
import {
  rowCenter,
  rowEven,
  SELECT_TEXT,
} from "../../../../../../styles/decorators";
import { ICON } from "./icon";
import type { TBaseWaveKey } from "./type";
import { BASE_WAVES } from "./type";

const Root = styled.ul`
  ${rowEven}
  height: ${ICON_SIZE}px;
`;

const Item = styled.li`
  position: relative;
  flex: 0.25;
  height: 100%;
`;

const Button = styled(motion.button)`
  ${rowCenter}
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Selected = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${ICON_SIZE}px;
  background-color: ${GLASS_PURPLE_09};
`;

export const Wave = () => {
  const { wave, dispatch } =
    useContext();
  return (
    <Root>
      {BASE_WAVES.map(
        (name: TBaseWaveKey) => (
          <Item key={name}>
            {name === wave && (
              <Selected layoutId="selected" />
            )}
            <Button
              {...SELECT_TEXT}
              onTap={() => {
                dispatch({
                  type: "wave",
                  value: name,
                });
              }}
            >
              {ICON[name]}
            </Button>
          </Item>
        )
      )}
    </Root>
  );
};
