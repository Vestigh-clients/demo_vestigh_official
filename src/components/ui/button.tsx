import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--theme-radius-md)] font-body text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--theme-button-primary-bg)] text-[var(--theme-button-primary-fg)] shadow-[var(--theme-shadow-soft)] hover:bg-[var(--theme-button-primary-hover-bg)]",
        destructive:
          "bg-[var(--theme-button-destructive-bg)] text-[var(--theme-button-destructive-fg)] hover:bg-[var(--theme-button-destructive-hover-bg)]",
        outline:
          "border border-[var(--theme-button-outline-border)] bg-[var(--theme-button-outline-bg)] text-[var(--theme-button-outline-fg)] hover:bg-[var(--theme-button-outline-hover-bg)] hover:text-[var(--theme-button-outline-hover-fg)]",
        secondary:
          "bg-[var(--theme-button-secondary-bg)] text-[var(--theme-button-secondary-fg)] hover:bg-[var(--theme-button-secondary-hover-bg)]",
        ghost:
          "text-[var(--theme-button-ghost-fg)] hover:bg-[var(--theme-button-ghost-hover-bg)] hover:text-[var(--theme-button-ghost-hover-fg)]",
        link: "text-[var(--theme-button-link-fg)] underline-offset-4 hover:text-[var(--theme-button-link-hover-fg)] hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
