import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TMoogConfigKey } from "../../../../../../state/constants/moog";
import {
  MOOG_CONFIG_DEFAULT,
  MOOG_RANGE,
} from "../../../../../../state/constants/moog";
import type {
  TResolverConfig,
  TKeyValuePair,
} from "../../../../../../slider/list";
import { SliderList } from "../../../../../../slider/list";
import { useContext } from "../../../../../../state/Context";

type TKey = TMoogConfigKey;
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

export const Moog: FC = () => {
  const { moog, dispatch } =
    useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={
        Object.entries(
          moog ?? MOOG_CONFIG_DEFAULT
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
              type: "moog",
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
        >) => MOOG_RANGE[key],
      }}
    />
  );
};
