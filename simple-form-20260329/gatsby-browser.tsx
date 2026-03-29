import React from "react";
import { WrapRootElement } from "./wrap-root-element";
import type { GatsbyBrowser } from "gatsby";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => <WrapRootElement element={element} />;
