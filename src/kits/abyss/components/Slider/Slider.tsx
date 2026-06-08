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
    <BaseSlider.Root className={cx("abyss-slider", className)} {...props}>
      {(label != null || showValue) && (
        <div className="abyss-slider__head">
          {label != null ? (
            <span className="abyss-cap abyss-slider__label">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="abyss-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="abyss-slider__control">
        <BaseSlider.Track className="abyss-slider__track">
          <BaseSlider.Indicator className="abyss-slider__indicator" />
          <BaseSlider.Thumb className="abyss-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
