import { cx } from "../cx";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ className, label, showValue = true, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cx("lumen-slider", className)} {...props}>
      {(label != null || showValue) && (
        <div className="lumen-slider__head">
          {label != null ? <span className="lumen-cap lumen-slider__label">{label}</span> : <span />}
          {showValue ? <BaseSlider.Value className="lumen-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="lumen-slider__control">
        <BaseSlider.Track className="lumen-slider__track">
          <BaseSlider.Indicator className="lumen-slider__indicator" />
          <BaseSlider.Thumb className="lumen-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
