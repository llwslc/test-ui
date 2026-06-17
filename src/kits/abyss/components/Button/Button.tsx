import "./Button.css";
import { makeButton } from "../../../../ui/components/Button/Button";

export const Button = makeButton("abyss", { rootClass: "abyss-frame" });
export type { ButtonProps, ButtonVariant, ButtonSize } from "../../../../ui/components/Button/Button";
