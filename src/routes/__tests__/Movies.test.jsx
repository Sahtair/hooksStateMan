import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {fireEvent, render} from "@testing-library/react";

import { Movies } from "../Movies";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ to, className }) => {
      return <a href={to} className={className} />;
    },
  };
});

jest.mock("../../context/movies", () => {
  return {
    ...jest.requireActual("../../context/movies"),
    useMoviesState: () => {
      return {
        state: {
          loading: false,
          movies: [{ _id: 1, name: "Movie1" },
          { _id: 2, name: "Movie2" },
          { _id: 3, name: "Movie3" },],
          error: null,
        },
      };
    },
  };
})

describe(`Tests for ${Movies.name}`, () => {


  beforeEach(jest.clearAllMocks)
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Movies />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("Initial render snapshot", () => {
    const component = renderer.create(<Movies />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("When clicking on a link, the link is clicked", () => {
    const {getAllByRole} = render(<Movies />);

    const link = getAllByRole("link")[0];
    fireEvent.click(link);

    expect(link).toBeVisible();
    expect(link.href).toContain("/movies/1");
  })
});
