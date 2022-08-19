import type {
  FC,
  SyntheticEvent,
} from "react";
import type { TSoundConfigKey } from "../../../state/constants/sound";
import {
  SOUND_CONFIG_DEFAULT,
  SOUND_RANGE,
} from "../../../state/constants/sound";
import type { TResolverConfig } from "../../../slider/list";
import { SliderList } from "../../../slider/list";
import { useContext } from "../../../state/Context";

type TKey = TSoundConfigKey;
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

export const Sound: FC = () => {
  const { dispatch } = useContext();
  return (
    <SliderList<TKey, TValue>
      keyValuePairs={Object.entries(
        SOUND_CONFIG_DEFAULT
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
              type: "sound",
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
        >) => SOUND_RANGE[key],
      }}
    />
  );
};
