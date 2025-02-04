import { createContext, useReducer, useContext, ReactNode } from "react";

interface User {
  id?: string;
  token?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
}

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE"; payload: Partial<User> };

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state,user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE":
      return {
        user: state.user ? { ...state.user, ...action.payload } : { ...initialState.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const UserContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useUser = () => useContext(UserContext);

// הגדרת ה-Provider ללא שימוש ב-React.FC
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    // וזה עשה ממש בעיות ניסיתי גם בקוד בכתיבה אחרת ולא הועיל.Providerניסיתי להוריד את ה
    <UserContext value={{ state, dispatch }}>
      {children}
    </UserContext>
  );
};

