import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TBitcrusherConfigKey } from "../../../../../../state/constants/bitcrusher";
import {
  BITCRUSHER_CONFIG_DEFAULT,
  BITCRUSHER_RANGE,
} from "../../../../../../state/constants/bitcrusher";
import type {
  TResolverConfig,
  TKeyValuePair,
} from "../../../../../../slider/list";
import { SliderList } from "../../../../../../slider/list";
import { useContext } from "../../../../../../state/Context";

type TKey = TBitcrusherConfigKey;
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

export const Bitcrusher: FC = () => {
  const { bitcrusher, dispatch } =
    useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={
        Object.entries(
          bitcrusher ??
            BITCRUSHER_CONFIG_DEFAULT
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
              type: "bitcrusher",
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
        >) => BITCRUSHER_RANGE[key],
      }}
    />
  );
};
