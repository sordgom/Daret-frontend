import { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);

  return (
    <AuthContext.Provider value={{
      auth, setAuth, persist, setPersist,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
