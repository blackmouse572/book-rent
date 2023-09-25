import React from 'react';

type Props = {};

function AuthLayout({}: Props) {
  return (
    <div>
      AuthLayout
      <Outlet />
    </div>
  );
}

export default AuthLayout;
