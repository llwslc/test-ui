import "./Button.css";
import { makeButton } from "../../../../ui/components/Button/Button";

export const Button = makeButton("brass", { rootClass: "brass-plate" });
export type { ButtonProps, ButtonVariant, ButtonSize } from "../../../../ui/components/Button/Button";
