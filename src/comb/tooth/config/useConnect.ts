import { useRef } from "react";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

export const useConnect = () => {
  const { context } = useContext();
  const { d, g, g2, w } =
    useToothContext();
  const {
    currentTime: t,
    destination,
  } = context;

  //d.connect(g).connect(w).connect(d);

  //d.connect(g2);

};
