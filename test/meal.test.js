import React from "react";
import { MemoryRouter } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Meal from "../client/src/components/Meal.jsx";

const localStorageMock = (function () {
  let store = {
    user: {
      id: "63d56921fb74d33c0a908e2b",
      name: "test1",
      phone_num: "+5108369377",
      friends: [
        "63d56921fb74d33c0a908e2b",
        "63d56a0483bd4d48f67c9981",
        "63d5690765b903d98477c097",
        "63d57d8704421e1d60c0dbbe",
      ],
    },
  };

  return {
    getItem: function (key) {
      return JSON.stringify(store[key]) || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

describe("Meal page render", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  test("render Meal component", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: {data: { _id: '63e6f008d2d4b9a1d331f5cc' }} }]}
      >
        <Meal />
      </MemoryRouter>
    );
  });
});
