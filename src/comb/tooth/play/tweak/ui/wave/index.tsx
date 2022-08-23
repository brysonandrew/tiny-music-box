import { ICON } from "./icon";
import type { TBaseWaveKey } from "./type";
import { BASE_WAVES } from "./type";
import { Select } from "../Select";

export const Wave = () => (
  <Select<TBaseWaveKey>
    name="wave"
    icon={ICON}
    items={BASE_WAVES}
  />
);
