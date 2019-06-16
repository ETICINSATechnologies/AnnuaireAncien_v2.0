import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Search from "./Search";
import Auth from "../../Components/Auth/Auth";

Enzyme.configure({ adapter: new Adapter() });

describe("Search component", () => {
  it("renders without crashing", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Search not connected snapshot test", () => {
    Auth.isConnected = jest.fn(() => false);
    const component = renderer.create(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Search connected snapshot test", () => {
    Auth.isConnected = jest.fn(() => true);
    const component = renderer.create(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
