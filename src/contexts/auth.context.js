import React, { createContext, useEffect /*, useState */ } from "react";
import firebase from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
  
// console.log("useHistory", useHistory);
export const AuthContext = createContext({
  user: null,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
});


export const AuthProvider = (props) => {
  // const [user, setUser] = useState(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const history = useHistory();
  // console.log('history', history);
  // console.log('user', user);
  const { addToast } = useToasts();
  // const login = (user) => setUser(user);
  // const logout = () => setUser(null);

  const login = ({email, password}) => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(`/`);
      })
      .catch((error) => {
        addToast(`Error: ${error}`, {
          appearance: "error",
        });
      });
  };
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push(`/`);
      })
      .catch((error) => {
        addToast(`Error: ${error}`, {
          appearance: "error",
        });
      });
  };

  useEffect(() => {
  if (error) {
    addToast(`Error: ${error}`, {
      appearance: "error",
    });
  }
  }, [error, addToast])


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>);
}
