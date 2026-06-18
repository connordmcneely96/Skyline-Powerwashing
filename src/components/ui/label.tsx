import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "mb-1.5 block text-sm font-medium text-ink",
      className
    )}
    {...props}
  >
    {children}
    {required && (
      <span className="ml-0.5 text-brand" aria-hidden="true">
        *
      </span>
    )}
  </label>
));
Label.displayName = "Label";

export { Label };
