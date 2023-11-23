import { states } from "../constants/USStates";

export const getStateAbbreviation = (state) => {
  const stateAbrev = states[state];

  if (stateAbrev) return stateAbrev;
  return state;
};