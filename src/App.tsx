import React from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import ShadowboxSignIn from './components/shadowbox/ShadowBoxSignIn';

type Props = {
  name?: string;
  age?: number;
};

// Reusable navigation component
const Navigation: React.FC = () => (
  <nav>
    <Link to="/" style={{ margin: '0 10px' }}>
      Home
    </Link>
    <Link to="/context" style={{ margin: '0 10px' }}>
      Context
    </Link>
    <Link to="/effect" style={{ margin: '0 10px' }}>
      Effect
    </Link>
  </nav>
);

// Reusable layout component
const PageLayout: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <ShadowboxSignIn />
);

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout title="Welcome Home!" />,
  },
  ]);

const App: React.FC<Props> = () => {
  return <RouterProvider router={router} />;
};

export default App;
