import type { FC } from "react";
import { Wave } from "./wave";
import { Effects } from "./effects";
import { Break } from "../../../../../styles/decorators";

export const Tweak: FC = () => (
  <>
    <Wave />
    <Break />
    <Effects />
  </>
);
