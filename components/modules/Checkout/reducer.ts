interface State {
  name: string;
  ccno: string;
  ccv: string;
  expire: string;
  isLoading: boolean;
}

type Action =
  | { type: "SET_ISIM"; payload: string }
  | { type: "SET_CCNO"; payload: string }
  | { type: "SET_CCV"; payload: string }
  | { type: "SET_EXPIRE"; payload: string }
  | { type: "SET_ISLOADING"; payload: boolean };

export const initialState: State = {
  name: "",
  ccno: "",
  ccv: "",
  expire: "",
  isLoading: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ISIM":
      return { ...state, name: action.payload };
    case "SET_CCNO":
      return { ...state, ccno: action.payload };
    case "SET_CCV":
      return { ...state, ccv: action.payload };
    case "SET_EXPIRE":
      return { ...state, expire: action.payload };
    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
