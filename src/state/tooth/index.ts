import type {
  TState,
  TReducerAction,
} from "./types";

export const reducer = (
  state: TState,
  { type, value }: TReducerAction
) => {
  switch (type) {
    // case "nodeRecord": {
    //   return {
    //     ...state,
    //     nodeRecord: value,
    //   };
    // }
    default: {
      console.error(type);
      throw new Error(
        `Action type invalid. ${type}`
      );
    }
  }
};
