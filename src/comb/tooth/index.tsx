import type { FC } from "react";
import { useContext } from "../../state/Context";
import { Provider as ProviderTooth } from "../../state/tooth/Provider";
import { useNodeRecord } from "./config/useNodeRecord";
import { Connect } from "./connect";
import { Tweak } from "./connect/tweak";
import { Surface } from "./surface";

type TProps = {
  midi: number;
};
export const Tooth: FC<TProps> = ({
  midi,
}) => {
  const { initMidis } = useContext();
  useNodeRecord(midi);
  const nodeRecord = initMidis[midi];
  if (!nodeRecord) return null;

  return (
    <ProviderTooth
      midi={midi}
      nodeRecord={nodeRecord}
    >
      <Connect>
        <Tweak />
      </Connect>
      <Surface />
    </ProviderTooth>
  );
};
