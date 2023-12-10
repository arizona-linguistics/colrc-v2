import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Bibliography from "../pages/Bibliography";
configure({adapter: new Adapter()});

test("renders singular table class", () => {
  shallow(<Bibliography/>);
})