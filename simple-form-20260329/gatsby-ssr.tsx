import React from "react";
import { WrapRootElement } from "./wrap-root-element";
import type { GatsbySSR } from "gatsby";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}) => <WrapRootElement element={element} />;
