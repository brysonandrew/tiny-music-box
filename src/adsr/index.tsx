import type {
  FC,
  SyntheticEvent,
} from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../state/Context";
import type { TKey } from "../state/constants/adsr";
import {
  ADSR_CONFIG,
  ADSR_KEYS,
} from "../state/constants/adsr";
import { Slider } from "../slider";

const WIDTH = 100;
const HEIGHT = 40;

const Root = styled.div`
  position: relative;
`;

const Panel = styled(motion.div)`
  position: relative;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`;

const List = styled(motion.ul)`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Item = styled(motion.li)`
  position: relative;
  height: 0;
  width: 0;
`;

export const Adsr: FC = () => {
  const { adsr, dispatch } =
    useContext();

  return (
    <Root>
      <Panel>
        <List>
          {ADSR_KEYS.map(
            (
              attributeName: TKey,
              attributeIndex: number
            ) => (
              <Item
                key={attributeName}
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                {...ADSR_CONFIG[
                  attributeName
                ].itemProps}
              >
                <Slider
                  name={attributeName}
                  value={
                    adsr[attributeName]
                  }
                  onChange={({
                    currentTarget,
                  }: SyntheticEvent<HTMLInputElement>) => {
                    dispatch({
                      type: "adsr",
                      value: {
                        [attributeName]:
                          +currentTarget.value,
                      },
                    });
                  }}
                  {...ADSR_CONFIG[
                    attributeName
                  ]}
                >
                  <>hi</>
                </Slider>
              </Item>
            )
          )}
        </List>
      </Panel>
    </Root>
  );
};
