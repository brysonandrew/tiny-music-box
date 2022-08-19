import type { SyntheticEvent } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { TSliderAttributes } from "..";
import { rowGap } from "../../styles/decorators";
import { textMdCss } from "../../styles/text";
import type { TRequireAtLeastOne } from "../../types";
import { Slider as SliderDark } from "..";

const Root = styled(motion.ul)`
  width: 100%;
`;

const Item = styled(motion.li)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  height: 72px;
  width: 100%;
  &:first-child {
    margin-top: 0;
  }
`;

const Row = styled.div`
  ${rowGap}
  width: 100%;
  transform: translateY(-50%);
`;

const itemCss = css`
  ${textMdCss}
  letter-spacing: 2px;
  padding: 8px;
`;
const Title = styled.h4`
  ${itemCss}
`;

const Value = styled.h4`
  ${itemCss}
`;
export type TListConfig = {
  id: string;
  list: JSX.Element;
};

type TKey<K> = K;
type TValue<T> = T;
export type TKeyValuePair<K, T> = [
  TKey<K>,
  TValue<T>
];
export type TResolverConfig<K, T> = {
  key: K;
  value: T;
};
export type TProps<K, T> = {
  keyValuePairs: TKeyValuePair<K, T>[];
  resolvers: {
    listConfig?(
      config: TResolverConfig<K, T>
    ): TListConfig;
    label: {
      title(
        config: TResolverConfig<K, T>
      ): string;
      value(
        config: TResolverConfig<K, T>
      ): string | number;
    };
    name(
      config: TResolverConfig<K, T>
    ): string;
    value(
      config: TResolverConfig<K, T>
    ): string | number;
    onChange(
      config: TResolverConfig<K, T>
    ): (
      event: SyntheticEvent<HTMLInputElement>
    ) => void;
    other(
      config: TResolverConfig<K, T>
    ): TRequireAtLeastOne<TSliderAttributes>;
  };
};
export const SliderList = <
  K extends string,
  T extends number | string
>({
  keyValuePairs,
  resolvers: {
    label,
    name,
    onChange,
    listConfig,
    other,
    ...rest
  },
}: TProps<K, T>) => (
  <Root>
    {keyValuePairs.map(
      ([key, value]: TKeyValuePair<
        K,
        T
      >) => (
        <Item key={key}>
          <Row>
            <Title>
              {label.title({
                key,
                value,
              })}
            </Title>
            <Value className="--value">
              {label.value({
                key,
                value,
              })}
            </Value>
          </Row>
          <SliderDark
            name={name({ key, value })}
            value={rest.value({
              key,
              value,
            })}
            onChange={onChange({
              key,
              value,
            })}
            {...(listConfig
              ? {
                  list: listConfig({
                    key,
                    value,
                  }).id,
                }
              : {})}
            {...other({ key, value })}
          >
            {listConfig
              ? listConfig({
                  key,
                  value,
                }).list
              : null}
          </SliderDark>
        </Item>
      )
    )}
  </Root>
);
