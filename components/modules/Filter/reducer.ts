interface State {
  from: string;
  to: string;
  date: Date;
}

type Action =
  | { type: "SET_FROM"; payload: string }
  | { type: "SET_TO"; payload: string }
  | { type: "SET_DATE"; payload: Date };

export const initialState: State = {
  from: "",
  to: "",
  date: new Date(),
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TO":
      return { ...state, to: action.payload };
    case "SET_FROM":
      return { ...state, from: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };

    default:
      return state;
  }
};
