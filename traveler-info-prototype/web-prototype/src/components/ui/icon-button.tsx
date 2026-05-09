import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Loading Dots ─────────────────────────────────────────────────────────────
// Uses bg-current so dots inherit the button's text color automatically.

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-current animate-[loading-dot_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}

// ─── Variants ─────────────────────────────────────────────────────────────────
//
// Color token mapping (same as Button):
//   primary[5] → primary-6  (base)
//   primary[6] → primary-7  (hover)
//   primary[7] → primary-8  (active / loading)
//   primary[0] → primary-1  (flat / outline hover bg)   ← spec: same for both
//   primary[1] → primary-2  (flat / outline active bg)
//   … same pattern for success / warning / danger
//   neutral[5] → neutral-6  (outline border)
//   neutral[7] → neutral-8  (outline / flat icon color)
//   neutral[2] → neutral-3  (neutral hover bg)
//   neutral[3] → neutral-4  (neutral active bg)
//
// ⚠️  Flat hover/active bg matches Outline (design spec SVG confirmed).
//     ul uses opacity overlay which gives a slightly different shade — wp
//     uses the explicit token which is correct per spec.
//
// ⚠️  shadow only has visual effect on circular shape (matches ui-library).
//
// ⚠️  Neutral Solid is intentionally absent (same rule as Button).

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "transition-colors cursor-pointer select-none",
    "focus-visible:outline-none",
    "[&_svg]:pointer-events-none",
    // disabled: not-allowed cursor + 48% opacity
    // aria-busy (loading): keep full opacity, block clicks
    "disabled:cursor-not-allowed disabled:opacity-[0.48]",
    "aria-busy:pointer-events-none aria-busy:opacity-100",
  ].join(" "),
  {
    variants: {
      variant: { primary: "", neutral: "", success: "", warning: "", danger: "" },
      appearance: { solid: "", outline: "border", flat: "" },
      shape: {
        rounded:  "rounded-[4px]",
        circular: "rounded-full",
      },
      size: {
        sm: "size-8  text-base", // 32px button — 16px icon (matches ul small)
        md: "size-10 text-2xl",  // 40px button — 24px icon (matches ul medium)
        lg: "size-12 text-2xl",  // 48px button — 24px icon (matches ul large)
      },
    },
    compoundVariants: [
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
      // hover/active bg intentionally same as Outline — matches design spec SVG
      {
        variant: "primary", appearance: "flat",
        className: [
          "text-primary-6",
          "not-disabled:hover:bg-primary-1 not-disabled:active:bg-primary-2",
          "focus-visible:ring-2 focus-visible:ring-primary-6/50",
        ].join(" "),
      },
      // ── Neutral Flat ────────────────────────────────────────────────────────
      {
        variant: "neutral", appearance: "flat",
        className: [
          "text-neutral-8",
          "not-disabled:hover:bg-neutral-3 not-disabled:active:bg-neutral-4",
          "focus-visible:ring-2 focus-visible:ring-neutral-6/50",
        ].join(" "),
      },
      // ── Success Flat ────────────────────────────────────────────────────────
      {
        variant: "success", appearance: "flat",
        className: [
          "text-success-6",
          "not-disabled:hover:bg-success-1 not-disabled:active:bg-success-2",
        ].join(" "),
      },
      // ── Warning Flat ────────────────────────────────────────────────────────
      {
        variant: "warning", appearance: "flat",
        className: [
          "text-warning-6",
          "not-disabled:hover:bg-warning-1 not-disabled:active:bg-warning-2",
        ].join(" "),
      },
      // ── Danger Flat ─────────────────────────────────────────────────────────
      {
        variant: "danger", appearance: "flat",
        className: [
          "text-danger-6",
          "not-disabled:hover:bg-danger-1 not-disabled:active:bg-danger-2",
          "focus-visible:ring-2 focus-visible:ring-danger-6/50",
        ].join(" "),
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
      shape: "rounded",
      size: "lg",
    },
  }
)

// ─── Icon Button ──────────────────────────────────────────────────────────────

export interface IconButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string
  loading?: boolean
  // shadow only has visual effect on circular shape (matches ui-library)
  shadow?: boolean
}

export { iconButtonVariants }

export function IconButton({
  className,
  variant = "primary",
  appearance = "solid",
  shape = "rounded",
  size = "lg",
  loading = false,
  shadow = false,
  disabled,
  children,
  ...props
}: IconButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="icon-button"
      data-variant={variant}
      data-appearance={appearance}
      data-shape={shape}
      className={cn(
        iconButtonVariants({ variant, appearance, shape, size }),
        shadow && "[box-shadow:0_4px_8px_color-mix(in_srgb,var(--color-neutral-10)_16%,transparent)]",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoadingDots /> : children}
    </ButtonPrimitive>
  )
}
