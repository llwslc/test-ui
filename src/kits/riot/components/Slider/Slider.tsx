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
    <BaseSlider.Root className={cx("riot-slider", className)} {...props}>
      {(label != null || showValue) && (
        <div className="riot-slider__head">
          {label != null ? (
            <span className="riot-cap riot-slider__label">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="riot-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="riot-slider__control">
        <BaseSlider.Track className="riot-slider__track">
          <BaseSlider.Indicator className="riot-slider__indicator" />
          <BaseSlider.Thumb className="riot-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
