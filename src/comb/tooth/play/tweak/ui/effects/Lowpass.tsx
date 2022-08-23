import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TLowpassConfigKey } from "../../../../../../state/constants/lowpass";
import {
  LOWPASS_CONFIG_DEFAULT,
  LOWPASS_RANGE,
} from "../../../../../../state/constants/lowpass";
import type {
  TResolverConfig,
  TKeyValuePair,
} from "../../../../../../slider/list";
import { SliderList } from "../../../../../../slider/list";
import { useContext } from "../../../../../../state/Context";

type TKey = TLowpassConfigKey;
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

export const Lowpass: FC = () => {
  const { lowpass, dispatch } =
    useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={
        Object.entries(
          lowpass ?? LOWPASS_CONFIG_DEFAULT
        ) as TKeyValuePair<
          TKey,
          TValue
        >[]
      }
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
            currentTarget: { value },
          }: SyntheticEvent<HTMLInputElement>) => {
            dispatch({
              type: "lowpass",
              value: {
                [key]: +value,
              },
            });
          },
        other: ({
          key,
        }: TResolverConfig<
          TKey,
          TValue
        >) => LOWPASS_RANGE[key],
      }}
    />
  );
};
