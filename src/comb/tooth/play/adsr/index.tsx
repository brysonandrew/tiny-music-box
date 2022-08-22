import type { FC } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../../../../state/Context";
import type { TAdsrKey } from "../../../../state/constants/adsr";
import {
  ADSR_HEIGHT,
  ADSR_WIDTH,
  ADSR_KEYS,
} from "../../../../state/constants/adsr";
import { GAP, HEADER_HEIGHT } from "../../../../styles/constants";
import { rowCenter } from "../../../../styles/decorators";
import { Item } from "./Item";

const WIDTH = ADSR_WIDTH;
const HEIGHT = ADSR_HEIGHT;

const Root = styled.div`
  position: relative;
  height: calc(
    100vh - ${HEADER_HEIGHT}px
  );
`;

const List = styled(motion.ul)`
  ${rowCenter}
  position: relative;
  top: ${HEADER_HEIGHT + GAP}px;
  left: ${HEIGHT * 0.25}px;
`;

export const Adsr: FC = () => {
  const { adsr } = useContext();

  return (
    <Root>
      <List style={{ rotateZ: 90 }}>
        {ADSR_KEYS.map(
          (attributeName: TAdsrKey) => (
            <Item
              key={attributeName}
              attributeName={
                attributeName
              }
              value={
                adsr[attributeName]
              }
            />
          )
        )}
      </List>
    </Root>
  );
};
