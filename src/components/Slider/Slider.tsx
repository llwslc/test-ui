import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Slider.css";

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({
  className,
  label,
  showValue = true,
  ...props
}: SliderProps) {
  return (
    <BaseSlider.Root
      className={["nova-slider", className].filter(Boolean).join(" ")}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="nova-slider__head">
          {label != null ? (
            <span className="nova-slider__label">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? (
            <BaseSlider.Value className="nova-slider__value" />
          ) : null}
        </div>
      )}
      <BaseSlider.Control className="nova-slider__control">
        <BaseSlider.Track className="nova-slider__track">
          <BaseSlider.Indicator className="nova-slider__indicator" />
          <BaseSlider.Thumb className="nova-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
