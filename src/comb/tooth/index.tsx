import type { FC } from "react";
import { useContext } from "../../state/Context";
import { Provider as ProviderTooth } from "../../state/tooth/Provider";
import { useNodeRecord } from "./config/useNodeRecord";
import { Play } from "./play";
import { Surface } from "./surface";

type TProps = {
  midi: number;
};
export const Tooth: FC<TProps> = ({
  midi,
}) => {
  const { initMidis, midis } =
    useContext();
  useNodeRecord(midi);
  const nodeRecord = initMidis[midi];
  if (!nodeRecord) return null;

  return (
    <ProviderTooth
      midi={midi}
      nodeRecord={nodeRecord}
    >
      <>{midis[midi] && <Play />}</>
      <Surface />
    </ProviderTooth>
  );
};
