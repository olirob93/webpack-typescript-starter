import React from "react";
import { render } from "@testing-library/react";
import TyprescriptTest from "./TyprescriptTest";

describe("TyprescriptTest tests", () => {
  it("should render", () => {
    expect(render(<TyprescriptTest />)).toBeTruthy();
  });
});
