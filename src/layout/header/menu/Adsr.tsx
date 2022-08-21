import type {
  FC,
  SyntheticEvent,
} from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../../../state/Context";
import type { TKey } from "../../../state/constants/adsr";
import {
  ADSR_HEIGHT,
  ADSR_WIDTH,
  ADSR_CONFIG,
  ADSR_KEYS,
} from "../../../state/constants/adsr";
import { Slider } from "../../../slider";
import {
  GAP,
  GAP_05,
  HEADER_HEIGHT,
} from "../../../styles/constants";
import {
  rowCenter,
  rowGap,
} from "../../../styles/decorators";
import { textSmCss } from "../../../styles/text";

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
  top: ${WIDTH * 0.25}px;
  left: ${HEIGHT * 0.25}px;
`;

const Item = styled(motion.li)`
  position: relative;
  height: 0;
  width: 0;
`;
const Row = styled(motion.div)`
  ${rowGap}
  width: 100%;
`;
const Label = styled(motion.div)`
  ${textSmCss}
  margin-right: ${GAP_05}px;
`;

const Value = styled(motion.div)`
  ${textSmCss}
  height: ${GAP}px;
`;

export const Adsr: FC = () => {
  const { adsr, dispatch } =
    useContext();

  return (
    <Root>
      <List style={{ rotateZ: 90 }}>
        {ADSR_KEYS.map(
          (attributeName: TKey) => {
            const value =
              adsr[attributeName];
            return (
              <Item
                key={attributeName}
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                {...ADSR_CONFIG[
                  attributeName
                ].itemProps}
              >
                <Row
                  style={
                    ADSR_CONFIG[
                      attributeName
                    ].labelStyle
                  }
                >
                  <Label className="--value">
                    {attributeName}
                  </Label>
                  <Value className="--value">
                    {`${(
                      value * 100
                    ).toFixed(0)}%`}
                  </Value>
                </Row>
                <Slider
                  name={attributeName}
                  value={value}
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
                  <>{""}</>
                </Slider>
              </Item>
            );
          }
        )}
      </List>
    </Root>
  );
};
