import * as React from "react";

import { Checkbox as BaseCheckbox } from "./ui/checkbox";
import { cn } from "./lib/cn";
import { ERROR_BORDER, fieldAria, InlineField, useFieldIds, type FieldProps } from "./Field";

export interface CheckboxProps extends React.ComponentProps<typeof BaseCheckbox>, FieldProps {}

/** `data-testid` lands on the checkbox itself. */
export const Checkbox = React.forwardRef<React.ElementRef<typeof BaseCheckbox>, CheckboxProps>(
  ({ label, hint, error, id, className, ...props }, ref) => {
    const ids = useFieldIds(id);
    return (
      <InlineField ids={ids} label={label} hint={hint} error={error}>
        <BaseCheckbox
          ref={ref}
          {...props}
          {...fieldAria(ids, { hint, error }, props)}
          className={cn("mt-0.5", error && ERROR_BORDER, className)}
        />
      </InlineField>
    );
  },
);
Checkbox.displayName = "Checkbox";
