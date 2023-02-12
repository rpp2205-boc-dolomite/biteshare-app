import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import React from 'react';
export default function RenderRouteWithOutletContext ({ context, children }){
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
