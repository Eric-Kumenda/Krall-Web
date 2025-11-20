"use client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}
