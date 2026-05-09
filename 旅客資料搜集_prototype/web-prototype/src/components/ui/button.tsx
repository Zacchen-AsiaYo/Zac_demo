import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Loading Dots ─────────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-current animate-[loading-dot_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}

// ─── Variants ─────────────────────────────────────────────────────────────────
//
// Color token mapping (ui-library 0-indexed → this project 1-indexed):
//   primary[5] → primary-6  (base)
//   primary[6] → primary-7  (hover)
//   primary[7] → primary-8  (active / loading)
//   primary[0] → primary-1  (outline hover bg)
//   primary[1] → primary-2  (outline active bg)
//   danger[5]  → danger-6   (base)  … same pattern
//   neutral[5] → neutral-6  (outline border)
//   neutral[7] → neutral-8  (outline text)
//   neutral[2] → neutral-3  (neutral outline hover bg)
//   neutral[3] → neutral-4  (neutral outline active bg)
//
// ⚠️  Outline padding is 1px less per side than Solid to compensate for the
//     1px border, keeping visual dimensions identical (matches ZeroHeight spec
//     and ui-library's getSizeStyles approach).
//
// ⚠️  Flat has no fixed height — size classes only set font-size / line-height.
//
// ⚠️  Neutral Solid is intentionally absent (ZeroHeight shows "—" for that
//     cell). Neutral only exists as Outline and Flat.

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 font-medium whitespace-nowrap",
    "transition-colors cursor-pointer select-none",
    "focus-visible:outline-none",
    // disabled: not-allowed cursor + 48% opacity
    // aria-busy (loading): keep full opacity, block clicks via pointer-events-none
    "disabled:cursor-not-allowed disabled:opacity-[0.48]",
    "aria-busy:pointer-events-none aria-busy:opacity-100",
  ].join(" "),
  {
    variants: {
      variant: { primary: "", neutral: "", success: "", warning: "", danger: "" },
      appearance: { solid: "", outline: "border", flat: "" },
      shape: { rounded: "rounded-[4px]", pill: "rounded-full" },
      size: {
        sm: "h-8 px-4 text-sm leading-5",
        md: "h-10 px-5 text-base leading-6",
        lg: "h-12 px-6 text-base leading-6",
      },
    },
    compoundVariants: [
      // ── Outline: 1px less horizontal padding to compensate for border ──────
      { appearance: "outline", size: "sm", className: "px-[15px]" },
      { appearance: "outline", size: "md", className: "px-[19px]" },
      { appearance: "outline", size: "lg", className: "px-[23px]" },

      // ── Primary Solid ───────────────────────────────────────────────────────
      {
        variant: "primary", appearance: "solid",
        className: [
          "bg-primary-6 text-white",
          "not-disabled:hover:bg-primary-7 not-disabled:active:bg-primary-8",
          "focus-visible:ring-2 focus-visible:ring-primary-6/50",
          "[&[aria-busy=true]]:bg-primary-8",
        ].join(" "),
      },
      // ── Success Solid ───────────────────────────────────────────────────────
      {
        variant: "success", appearance: "solid",
        className: [
          "bg-success-6 text-white",
          "not-disabled:hover:bg-success-7 not-disabled:active:bg-success-8",
          "focus-visible:ring-2 focus-visible:ring-success-6/50",
          "[&[aria-busy=true]]:bg-success-8",
        ].join(" "),
      },
      // ── Warning Solid ───────────────────────────────────────────────────────
      {
        variant: "warning", appearance: "solid",
        className: [
          "bg-warning-6 text-white",
          "not-disabled:hover:bg-warning-7 not-disabled:active:bg-warning-8",
          "focus-visible:ring-2 focus-visible:ring-warning-6/50",
          "[&[aria-busy=true]]:bg-warning-8",
        ].join(" "),
      },
      // ── Danger Solid ────────────────────────────────────────────────────────
      {
        variant: "danger", appearance: "solid",
        className: [
          "bg-danger-6 text-white",
          "not-disabled:hover:bg-danger-7 not-disabled:active:bg-danger-8",
          "focus-visible:ring-2 focus-visible:ring-danger-6/50",
          "[&[aria-busy=true]]:bg-danger-8",
        ].join(" "),
      },

      // ── Primary Outline ─────────────────────────────────────────────────────
      {
        variant: "primary", appearance: "outline",
        className: [
          "bg-white border-primary-6 text-primary-6",
          "not-disabled:hover:bg-primary-1 not-disabled:active:bg-primary-2",
          "focus-visible:ring-2 focus-visible:ring-primary-6/50",
          "[&[aria-busy=true]]:bg-primary-2",
        ].join(" "),
      },
      // ── Neutral Outline ─────────────────────────────────────────────────────
      {
        variant: "neutral", appearance: "outline",
        className: [
          "bg-white border-neutral-6 text-neutral-8",
          "not-disabled:hover:bg-neutral-3 not-disabled:active:bg-neutral-4",
          "focus-visible:ring-2 focus-visible:ring-neutral-6/50",
          "[&[aria-busy=true]]:bg-neutral-4",
        ].join(" "),
      },
      // ── Success Outline ─────────────────────────────────────────────────────
      {
        variant: "success", appearance: "outline",
        className: [
          "bg-white border-success-6 text-success-6",
          "not-disabled:hover:bg-success-1 not-disabled:active:bg-success-2",
          "focus-visible:ring-2 focus-visible:ring-success-6/50",
          "[&[aria-busy=true]]:bg-success-2",
        ].join(" "),
      },
      // ── Warning Outline ─────────────────────────────────────────────────────
      {
        variant: "warning", appearance: "outline",
        className: [
          "bg-white border-warning-6 text-warning-6",
          "not-disabled:hover:bg-warning-1 not-disabled:active:bg-warning-2",
          "focus-visible:ring-2 focus-visible:ring-warning-6/50",
          "[&[aria-busy=true]]:bg-warning-2",
        ].join(" "),
      },
      // ── Danger Outline ──────────────────────────────────────────────────────
      {
        variant: "danger", appearance: "outline",
        className: [
          "bg-white border-danger-6 text-danger-6",
          "not-disabled:hover:bg-danger-1 not-disabled:active:bg-danger-2",
          "focus-visible:ring-2 focus-visible:ring-danger-6/50",
          "[&[aria-busy=true]]:bg-danger-2",
        ].join(" "),
      },

      // ── Primary Flat ────────────────────────────────────────────────────────
      {
        variant: "primary", appearance: "flat",
        className: [
          "text-primary-6",
          "not-disabled:hover:text-primary-7 not-disabled:active:text-primary-8",
          "focus-visible:ring-2 focus-visible:ring-primary-6/50",
        ].join(" "),
      },
      // ── Neutral Flat ────────────────────────────────────────────────────────
      {
        variant: "neutral", appearance: "flat",
        className: [
          "text-neutral-8",
          "not-disabled:hover:text-neutral-9 not-disabled:active:text-neutral-10",
        ].join(" "),
      },
      // ── Success Flat ────────────────────────────────────────────────────────
      {
        variant: "success", appearance: "flat",
        className: [
          "text-success-6",
          "not-disabled:hover:text-success-7 not-disabled:active:text-success-8",
        ].join(" "),
      },
      // ── Warning Flat ────────────────────────────────────────────────────────
      {
        variant: "warning", appearance: "flat",
        className: [
          "text-warning-6",
          "not-disabled:hover:text-warning-7 not-disabled:active:text-warning-8",
        ].join(" "),
      },
      // ── Danger Flat ─────────────────────────────────────────────────────────
      {
        variant: "danger", appearance: "flat",
        className: [
          "text-danger-6",
          "not-disabled:hover:text-danger-7 not-disabled:active:text-danger-8",
          "focus-visible:ring-2 focus-visible:ring-danger-6/50",
        ].join(" "),
      },

      // ── Flat: override size to font-only (no fixed height / padding) ────────
      { appearance: "flat", size: "sm", className: "h-auto px-0 py-0" },
      { appearance: "flat", size: "md", className: "h-auto px-0 py-0" },
      { appearance: "flat", size: "lg", className: "h-auto px-0 py-0" },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
      shape: "rounded",
      size: "md",
    },
  }
)

// ─── Button ───────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
  // shadow only has visual effect on pill shape (matches ui-library behaviour)
  shadow?: boolean
}

export function Button({
  className,
  variant = "primary",
  appearance = "solid",
  shape = "rounded",
  size = "md",
  loading = false,
  icon,
  shadow = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-appearance={appearance}
      data-shape={shape}
      className={cn(
        buttonVariants({ variant, appearance, shape, size }),
        shadow && "[box-shadow:0_4px_8px_color-mix(in_srgb,var(--color-neutral-10)_16%,transparent)]",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <>
          {icon && (
            <span className="inline-flex shrink-0 size-4" aria-hidden>
              {icon}
            </span>
          )}
          {children}
        </>
      )}
    </ButtonPrimitive>
  )
}

export { buttonVariants }
