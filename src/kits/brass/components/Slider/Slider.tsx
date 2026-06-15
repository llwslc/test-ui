import type { ReactNode } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cx } from "../cx";
import "./Slider.css";

export interface SliderProps extends React.ComponentProps<typeof BaseSlider.Root> {
  label?: ReactNode;
}

export function Slider({ label, className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cx("brass-slider", className)} {...props}>
      {label && (
        <div className="brass-slider__head">
          <BaseSlider.Label className="brass-cap">{label}</BaseSlider.Label>
          <BaseSlider.Value className="brass-slider__value" />
        </div>
      )}
      <BaseSlider.Control className="brass-slider__control">
        <BaseSlider.Track className="brass-slider__track">
          <BaseSlider.Indicator className="brass-slider__indicator" />
          <BaseSlider.Thumb className="brass-slider__thumb brass-knob" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
