import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TTweakConfigKey } from "../../../../state/constants/tweak";
import {
  TWEAK_CONFIG_DEFAULT,
  TWEAK_RANGE,
} from "../../../../state/constants/tweak";
import type {
  TResolverConfig,
  TKeyValuePair,
} from "../../../../slider/list";
import { SliderList } from "../../../../slider/list";
import { useContext } from "../../../../state/Context";

type TKey = TTweakConfigKey;
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

export const Tweak: FC = () => {
  const { tweak, dispatch } =
    useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={
        Object.entries(
          tweak ?? TWEAK_CONFIG_DEFAULT
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
            currentTarget,
          }: SyntheticEvent<HTMLInputElement>) => {
            dispatch({
              type: "tweak",
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
        >) => TWEAK_RANGE[key],
      }}
    />
  );
};
