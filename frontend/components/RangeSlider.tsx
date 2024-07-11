import React,
{
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import { numberWithSpaces } from '@/utils/numberWithSpaces';

interface RangeSliderProps {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  priceCap: number;
  char?: string | null;
  onChange: (min: number, max: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  priceCap,
  char,
  onChange,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (initialMax - initialMin >= priceCap && initialMax <= max) {
      if (value < initialMax) {
        onChange(value, initialMax);
      }
    } else if (value < initialMin) {
      onChange(value, initialMax);
    }
  };

  const handleMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (initialMax - initialMin >= priceCap && initialMax <= max) {
      if (value > initialMin) {
        onChange(initialMin, value);
      }
    } else if (value > initialMax) {
      onChange(initialMin, value);
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = `${(initialMin / max) * step}%`;
      progressRef.current.style.right = `${step - (initialMax / max) * step}%`;
    }
  }, [initialMin, initialMax, max, step]);

  return (
    <div className="w-full selector pb-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="rounded-md">
            <span>От </span>
            <input
              onChange={handleMin}
              type="text"
              value={numberWithSpaces(initialMin)}
              className="w-20 rounded-md pointer-events-none focus:outline-none"
            />
            <span>{char}</span>
          </div>
          <div> — </div>
          <div>
            <span>До </span>
            <input
              onChange={handleMax}
              type="text"
              value={numberWithSpaces(initialMax)}
              className="w-20 rounded-md pointer-events-none focus:outline-none"
            />
            <span>{char}</span>
          </div>
        </div>

        <div className="mt-3.5">
          <div className="slider relative rounded-md">
            <div className="progress absolute border border-blue rounded" ref={progressRef} />
          </div>

          <div className="range-input relative">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={initialMin}
              className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            />
            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={initialMax}
              className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

RangeSlider.defaultProps = {
  char: '',
};

export default RangeSlider;
