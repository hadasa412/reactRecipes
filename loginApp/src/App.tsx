import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './Router';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={myRouter} />
    </UserProvider>
  );
}

export default App;
