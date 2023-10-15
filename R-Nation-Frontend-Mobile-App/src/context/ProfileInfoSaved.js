import React, { useState, createContext } from 'react';

export const ProfileInfoSaved = createContext();

export const ProfileInfoSavedProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <ProfileInfoSaved.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </ProfileInfoSaved.Provider>
  );
};
