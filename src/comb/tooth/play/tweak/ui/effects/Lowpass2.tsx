import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TLowpass2ConfigKey } from "../../../../../../state/constants/lowpass2";
import {
  LOWPASS2_CONFIG_DEFAULT,
  LOWPASS2_RANGE,
} from "../../../../../../state/constants/lowpass2";
import type {
  TResolverConfig,
  TKeyValuePair,
} from "../../../../../../slider/list";
import { SliderList } from "../../../../../../slider/list";
import { useContext } from "../../../../../../state/Context";

type TKey = TLowpass2ConfigKey;
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

export const Lowpass2: FC = () => {
  const { lowpass2, dispatch } =
    useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={
        Object.entries(
          lowpass2 ??
            LOWPASS2_CONFIG_DEFAULT
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
              type: "lowpass2",
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
        >) => LOWPASS2_RANGE[key],
      }}
    />
  );
};
