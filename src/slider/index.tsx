import type {
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { inputRangeStyles } from "./styles";
import styled from "@emotion/styled";

const Root = styled(motion.label)`
  position: relative;
  width: 100%;
  height: 40px;
  z-index: 0;

  & datalist {
    position: absolute;
    display: flex;
    align-items: flex-start;
    top: -10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 10px;
    pointer-events: none;
  }
  & option {
    position: absolute;
    top: 20px;
    left: 0;
    font-size: 10px;
    width: 0;
    &:last-child {
      text-align: right;
    }
    &:after {
      content: "";
      top: -10px;
      height: 10px;
      width: 1px;
    }
  }
`;

const Input = styled(motion.input)`
  position: relative;
  left: 0;
  top: 0;
  height: 20px;
  width: 100%;
  transform: translateY(-100%);
`;
export type TSliderAttributes =
  InputHTMLAttributes<HTMLInputElement> &
    MotionProps;
type TProps = TSliderAttributes & {
  children?: JSX.Element | null;
  labelProps?: MotionProps &
    LabelHTMLAttributes<HTMLLabelElement>;
};
export const Slider: FC<TProps> = ({
  children,
  name,
  value,
  onChange,
  labelProps,
  ...props
}) => (
  <Root {...(labelProps || {})}>
    <Input
      name={name}
      type="range"
      value={value ?? ""}
      onChange={onChange}
      {...props}
    />
    {children}
  </Root>
);
