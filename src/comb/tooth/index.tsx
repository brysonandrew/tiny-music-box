import type { FC } from "react";
import type { TNodeRecord } from "../../state/constants/node-record";
import { useContext } from "../../state/Context";
import { Provider } from "../../state/tooth/Provider";
import { useNodeRecord } from "./config/useNodeRecord";
import { Connect } from "./connect";
import { Tweak } from "./connect/tweak";
import { Surface } from "./connect/tweak/surface";

type TProps = {
  midi: number;
};
export const Tooth: FC<TProps> = ({
  midi,
}) => {
  const {
    initMidis,
    dispatch,
    ...rest
  } = useContext();
  useNodeRecord(midi);

  if (!initMidis[midi]) return null;
  console.log(initMidis[midi]);
  return (
    <Provider
      midi={midi}
      nodeRecord={
        initMidis[midi] as TNodeRecord
      }
    >
      <Connect>
        <Tweak>
          <Surface />
        </Tweak>
      </Connect>
    </Provider>
  );
};
