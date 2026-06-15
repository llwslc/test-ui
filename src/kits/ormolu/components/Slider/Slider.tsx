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
    <BaseSlider.Root className={cx("ormolu-slider", className)} {...props}>
      {(label != null || showValue) && (
        <div className="ormolu-slider__head">
          {label != null ? (
            <span className="ormolu-cap ormolu-slider__label">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="ormolu-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="ormolu-slider__control">
        <BaseSlider.Track className="ormolu-slider__track">
          <BaseSlider.Indicator className="ormolu-slider__indicator" />
          <BaseSlider.Thumb className="ormolu-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
