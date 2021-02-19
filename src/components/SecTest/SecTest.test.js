import React from "react";
import { render } from "@testing-library/react";
import SecTest from "./SecTest";

describe("SecTest tests", () => {
  it("should render", () => {
    expect(render(<SecTest />)).toBeTruthy();
  });
});
