import * as React from "react";

import { cn } from "../lib/cn";

// The focus border is `--color-ring`, the accent. An app's own unlayered `input` rules would beat these
// utilities: the README says to put them in a layer.
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      data-slot="input"
      className={cn(
        "flex h-9 w-full border border-input focus:border-ring bg-background dark:focus:bg-field-focus px-3 py-1 text-sm text-foreground transition-colors motion-reduce:transition-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
