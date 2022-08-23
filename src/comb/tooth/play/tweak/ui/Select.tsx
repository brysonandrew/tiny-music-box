import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../../../../../state/Context";
import {
  GLASS_PURPLE_09,
  ICON_SIZE,
} from "../../../../../styles/constants";
import {
  rowCenter,
  rowEven,
  SELECT_TEXT,
} from "../../../../../styles/decorators";
import type { TState } from "../../../../../state/types";

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

type TProps<T extends string> = {
  name: keyof TState;
  icon: Record<T, JSX.Element>;
  items: readonly T[];
};
export const Select = <
  T extends string
>({
  name,
  icon,
  items,
}: TProps<T>) => {
  const context = useContext();
  return (
    <Root>
      {items.map((key: T) => (
        <Item key={key}>
          {key === context[name] && (
            <Selected layoutId={name} />
          )}
          <Button
            {...SELECT_TEXT}
            onTap={() => {
              context.dispatch({
                type: name,
                value: key,
              });
            }}
          >
            {icon[key]}
          </Button>
        </Item>
      ))}
    </Root>
  );
};
