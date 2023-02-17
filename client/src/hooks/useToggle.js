import { useState } from "react";

function useToggle(intialVal = false) {
  const [state, setState] = useState(intialVal);
  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
}

export default useToggle;
