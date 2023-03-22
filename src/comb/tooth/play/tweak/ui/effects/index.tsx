import styled from "@emotion/styled";
import { useContext } from "../../../../../../state/Context";
import { Break } from "../../../../../../styles/decorators";
import { Select } from "../Select";
import { Bitcrusher } from "./Bitcrusher";
import { ICON } from "./icon";
import { Lowpass } from "./Lowpass";
import { Lowpass2 } from "./Lowpass2";
import { Moog } from "./Moog";
import type { TEffectKey } from "./type";
import { EFFECTS } from "./type";

export const Effects = () => {
  const { effect } = useContext();
  return (
    <>
      <Select<TEffectKey>
        name="effect"
        icon={ICON}
        items={EFFECTS}
      />
      <Break />
      {
        {
          moog: <Moog />,
          bitcrusher: <Bitcrusher />,
          lowpass: <Lowpass />,
          lowpass2: <Lowpass2 />,
        }[effect]
      }
    </>
  );
};
