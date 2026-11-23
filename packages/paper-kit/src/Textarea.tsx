import * as React from "react";

import { Textarea as BaseTextarea } from "./ui/textarea";
import { cn } from "./lib/cn";
import { ERROR_BORDER, fieldAria, StackedField, useFieldIds, type FieldProps } from "./Field";

export interface TextareaProps extends React.ComponentProps<"textarea">, FieldProps {}

/** `data-testid` lands on the textarea itself. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, id, className, ...props }, ref) => {
    const ids = useFieldIds(id);
    return (
      <StackedField ids={ids} label={label} hint={hint} error={error}>
        <BaseTextarea ref={ref} {...props} {...fieldAria(ids, { hint, error }, props)} className={cn(error && ERROR_BORDER, className)} />
      </StackedField>
    );
  },
);
Textarea.displayName = "Textarea";
