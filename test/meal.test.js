import React from "react";
import { MemoryRouter } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Meal from "../client/src/components/Meal.jsx";
import RenderRouteWithOutletContext from './RenderWithOutlet.jsx';
var store = {
  user: {
    id: "63d5690765b903d98477c097",
    name: "stacey",
    phone_num: "+14086934417",
    friends: ['63d5838a04780bc64888352b', '63d56f15bc52fa12c202aaf4', '63d59928f8f3035eb877d500', '63d57c569e7990832e533c76', '63d56a0483bd4d48f67c9981']
  }
}

test("default", () => {
  expect(1+1).toBe(2);
})


// describe("Meal page render", () => {
//   beforeEach(() => {
//     Object.defineProperty(window, "localStorage", { value: localStorageMock });
//   });

//   test("render Meal component", async () => {
//     render(
//       <MemoryRouter
//         initialEntries={[{ pathname: "/", state: {data: { _id: '63e6f008d2d4b9a1d331f5cc' }} }]}
//       >
//         <Meal />
//       </MemoryRouter>
//     );
//   });
// });
