import React, { useState, useEffect } from 'react';
import { userDetails } from '../../apis/setting/userDetails';
import { availableApps } from '../../apis/availableApps/availableApps';
import constants from '../../constants/constants';
import Header from '../Header/Header';
import Nav from './Nav/Nav';
import Spinner from '../../MaterialUI/Component/Spinner/Spinner';
import Footer from '../Footer/Footer';

const Setting = () => {
  const [userInfo, setUserInfo] = useState({});
  const [intAppsInfo, setIntAppsInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userDetailsUrl = `${constants.serverURL}/users/detail`;
    const getUserDetails = async () => {
      setLoading(true);
      const api = await userDetails(userDetailsUrl);
      if (api.httpStatus === 401) {
        window.location.href = '/login';
      }
      setUserInfo(api.resData.data);
    };
    getUserDetails();
    const intAppUrl = `${constants.serverURL}/apps`;
    const getIntAppDetails = async () => {
      const api = await availableApps(intAppUrl);
      if (api) {
        setLoading(false);
      }
      if (api.httpStatus === 401) {
        window.location.href = '/login';
      }
      setIntAppsInfo(api.resData.data);
    };
    getIntAppDetails();
  }, []);
  return (
    <div>
      <Header pageName='Setting' />
      {loading ? (
        <Spinner />
      ) : (
        <Nav userInfo={userInfo} intAppsInfo={intAppsInfo} />
      )}

      <Footer />
    </div>
  );
};

export default Setting;
