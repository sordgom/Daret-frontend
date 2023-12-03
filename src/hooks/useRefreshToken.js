import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  let refreshToken = '';
  let accessTokenExpiresAt = '';
  if( auth != {}){
    refreshToken = auth?.refreshToken;
    accessTokenExpiresAt = auth?.accessTokenExpiresAt;
  }
  const refresh = async () => {
    try {
      const response = await axios.post(
        '/tokens/refresh',
        {
          refresh_token: refreshToken,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      // Ensure you're updating the refresh token as well, if the server provides it
      setAuth((prev) => ({
        ...prev,
        refreshToken: response.data.accessToken,
        accessTokenExpiresAt: response.data.accessTokenExpiresAt,
      }));

      return response.data.accessToken;
    } catch (error) {
      console.error(error);
    }
  };

  let refreshTokenDate = new Date(accessTokenExpiresAt);
  let currentDate = new Date();
  let timeDifference = currentDate - refreshTokenDate;

  // Calculate the time difference in seconds, minutes, hours, and days
  let secondsDiff = Math.floor(timeDifference / 1000);
  let minutesDiff = Math.floor(secondsDiff / 60);
  let hoursDiff = Math.floor(minutesDiff / 60);
  let daysDiff = Math.floor(hoursDiff / 24);
  if(daysDiff > 0 || hoursDiff > 0 || minutesDiff > 15) {
    refresh();
  }

  return refresh;
};

export default useRefreshToken;
