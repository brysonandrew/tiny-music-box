import type {
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import type { MotionProps } from "framer-motion";
import { Root, Input } from "./styles";

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
