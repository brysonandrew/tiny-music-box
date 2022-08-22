import type {
  FC,
  SyntheticEvent,
} from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Slider } from "../../../../../slider";
import type { TAdsrKey } from "../../../../../state/constants/adsr";
import { ADSR_STYLE } from "../../../../../state/constants/adsr";
import {
  GAP_05,
  GAP,
} from "../../../../../styles/constants";
import { rowGap } from "../../../../../styles/decorators";
import { textSmCss } from "../../../../../styles/text";
import { useContext } from "../../../../../state/Context";

const Root = styled(motion.li)`
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

type TProps = {
  attributeName: TAdsrKey;
  value: number;
};
export const Item: FC<TProps> = ({
  attributeName,
  value,
}) => {
  const { dispatch } = useContext();

  return (
    <Root
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      {...ADSR_STYLE[attributeName]
        .itemProps}
    >
      <Row
        style={
          ADSR_STYLE[attributeName]
            .labelStyle
        }
      >
        <Label className="--value">
          {attributeName}
        </Label>
        <Value className="--value">
          {`${(value * 100).toFixed(
            0
          )}%`}
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
        {...ADSR_STYLE[attributeName]}
      >
        <>{""}</>
      </Slider>
    </Root>
  );
};
