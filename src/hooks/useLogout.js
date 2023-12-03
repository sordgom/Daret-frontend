import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem('auth');
    setPersist(false);
    localStorage.removeItem('persist');
  };

  return logout;
};

export default useLogout;
