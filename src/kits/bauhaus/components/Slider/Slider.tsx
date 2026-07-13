import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ label, showValue = true, className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cx("bauhaus-slider", className)} {...props}>
      {(label != null || showValue) && (
        <div className="bauhaus-slider__head">
          {label != null ? (
            <span className="bauhaus-cap bauhaus-slider__label">{label}</span>
          ) : null}
          {showValue ? <BaseSlider.Value className="bauhaus-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="bauhaus-slider__control">
        <BaseSlider.Track className="bauhaus-slider__track">
          <BaseSlider.Indicator className="bauhaus-slider__indicator" />
          <BaseSlider.Thumb className="bauhaus-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
