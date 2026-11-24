import * as React from "react";

import { RadioGroup as BaseRadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "./lib/cn";
import { ERROR_BORDER, fieldAria, FieldNote, InlineField, useFieldIds, type FieldProps } from "./Field";

export interface RadioOption {
  /** What the group reports when this option is chosen. */
  value: string;
  /** What the reader sees beside the mark. */
  label: string;
  /** One line under the label. */
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadioGroup>, "children" | "aria-labelledby">,
    FieldProps {
  /** The choices, in the order they read. Arrow keys move through them and choose; a disabled one is skipped. */
  options: RadioOption[];
  /** `horizontal` lays the options in a row. Left unset, they stack and all four arrow keys move, as in a native radio group; set, only the arrows along that axis do. */
  orientation?: "horizontal" | "vertical";
}

function Option({
  groupId,
  index,
  option,
  error,
}: {
  groupId: string;
  index: number;
  option: RadioOption;
  error: boolean;
}) {
  const ids = useFieldIds(`${groupId}-option-${index}`);
  return (
    <InlineField ids={ids} label={option.label} hint={option.hint}>
      <RadioGroupItem
        value={option.value}
        disabled={option.disabled}
        {...fieldAria(ids, { hint: option.hint })}
        className={cn("mt-0.5", error && ERROR_BORDER)}
      />
    </InlineField>
  );
}

/**
 * One choice from a few, with a label for the group and one on each option. `data-testid` lands on the
 * group; `name` makes the choice part of a form. Over Radix's radio group: radiogroup and radio roles,
 * one tab stop, arrow keys move and choose.
 */
export const RadioGroup = React.forwardRef<React.ElementRef<typeof BaseRadioGroup>, RadioGroupProps>(
  ({ label, hint, error, id, options, orientation, className, ...props }, ref) => {
    const ids = useFieldIds(id);
    return (
      <div className="grid gap-1.5">
        <span id={ids.labelId} className="text-xs font-semibold text-foreground">
          {label}
        </span>
        <BaseRadioGroup
          ref={ref}
          orientation={orientation}
          {...props}
          {...fieldAria(ids, { hint, error }, props)}
          aria-labelledby={ids.labelId}
          className={cn(orientation === "horizontal" && "flex flex-wrap gap-x-6 gap-y-2", className)}
        >
          {options.map((option, index) => (
            <Option key={option.value} groupId={ids.id} index={index} option={option} error={Boolean(error)} />
          ))}
        </BaseRadioGroup>
        <FieldNote ids={ids} hint={hint} error={error} />
      </div>
    );
  },
);
RadioGroup.displayName = "RadioGroup";
