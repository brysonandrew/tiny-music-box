import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TStyleConfigKey } from "../../../state/constants/style";
import {
  STYLE_CONFIG_DEFAULT,
  STYLE_RANGE,
} from "../../../state/constants/style";
import type { TResolverConfig } from "../../../slider/list";
import { SliderList } from "../../../slider/list";
import { useContext } from "../../../state/Context";

type TKey = TStyleConfigKey;
type TValue = number;
const resolveName = ({
  key,
}: TResolverConfig<TKey, TValue>) =>
  key;
const resolveValue = ({
  key,
  value,
}: TResolverConfig<TKey, TValue>) =>
  value;

export const Style: FC = () => {
  const { dispatch } = useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={Object.entries(
        STYLE_CONFIG_DEFAULT
      )}
      resolvers={{
        label: {
          title: resolveName,
          value: resolveValue,
        },
        name: resolveName,
        value: ({
          value,
        }: TResolverConfig<
          TKey,
          TValue
        >) => value ?? "",
        onChange:
          ({
            key,
          }: TResolverConfig<
            TKey,
            TValue
          >) =>
          ({
            currentTarget,
          }: SyntheticEvent<HTMLInputElement>) => {
            dispatch({
              type: "style",
              value: {
                [key]:
                  +currentTarget.value,
              },
            });
          },
        other: ({
          key,
        }: TResolverConfig<
          TKey,
          TValue
        >) => STYLE_RANGE[key],
      }}
    />
  );
};
