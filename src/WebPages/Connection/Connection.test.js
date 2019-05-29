import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import fetch from "../../__mocks__/function/fetch";
import Connection from "./Connection";
import Auth from "../../Components/Auth/Auth";

Enzyme.configure({ adapter: new Adapter() });

describe("Connection component", () => {
  it("renders without crashing", () => {
    const componentDiv = document.createElement("div");
    ReactDOM.render(
      shallow(
        <BrowserRouter>
          <Connection />
        </BrowserRouter>
      ),
      componentDiv
    );
    ReactDOM.unmountComponentAtNode(componentDiv);
  });

  it("Connection unit test", () => {
    Auth.isConnected = jest.fn(() => true);
    expect(shallow(<Connection />).find(".Connection").length).toBe(1);
  });

  it("Connection accepted snapshot test", () => {
    const component = renderer.create(
      <BrowserRouter>
        <Connection />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
