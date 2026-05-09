"use client"

// ─── Alert ────────────────────────────────────────────────────────────────────
// Primitive: @base-ui/react/alert-dialog
// ZeroHeight: https://zeroheight.com/8ei12wwuw/p/81e2bf-alert
//
// Spec (confirmed from ZeroHeight + Figma SVG):
//   Container  : white, rounded-[4px], p-4 (16px)
//   Width      : 320px (Web) / calc(100vw - 32px) (App, responsive)
//   Title      : optional, neutral-10, text-xl font-bold leading-7
//   Content    : neutral-8, text-base leading-6
//   Buttons    : right-aligned (justify-end), gap-4
//                primary → primary solid / destructive → danger solid
//                dismiss  → neutral outline
//   Overlay    : ❌ 不可透過點擊 overlay 關閉（ZeroHeight 規定）
//                @base-ui/react AlertDialog 預設即阻止 overlay 關閉 ✅
// ─────────────────────────────────────────────────────────────────────────────

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

const {
  Root,
  Backdrop,
  Popup,
  Portal,
  Title,
  Description,
  Close,
} = AlertDialogPrimitive
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertType = "normal" | "destructive"

export interface AlertAction {
  label: string
  onClick: () => void
}

export interface AlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Title is optional per ZeroHeight spec */
  title?: string
  content: string
  /** "destructive" changes the primary button to danger variant */
  type?: AlertType
  primaryAction: AlertAction
  dismissAction?: AlertAction
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AlertDialog({
  open,
  onOpenChange,
  title,
  content,
  type = "normal",
  primaryAction,
  dismissAction,
  className,
}: AlertProps) {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        {/* Overlay — @base-ui AlertDialog blocks overlay-click close by design */}
        <Backdrop className="fixed inset-0 z-50 bg-black/50" />

        {/* Dialog card */}
        <Popup
        data-slot="alert-dialog"
        data-type={type}
        className={cn(
          "fixed z-50 inset-0 m-auto",
          "bg-white rounded-[4px] p-4",
          "flex flex-col gap-2",
          // Web: 320px fixed / App (mobile): full width minus 32px margin
          "w-[calc(100vw-32px)] sm:w-[320px]",
          // Height is auto-sized by content
          "h-fit",
          className
        )}
      >
        {/* Title (optional) */}
        {title && (
          <Title
            data-slot="alert-dialog-title"
            className="text-xl font-bold leading-7 text-neutral-10"
          >
            {title}
          </Title>
        )}

        {/* Content */}
        <Description
          data-slot="alert-dialog-content"
          className="text-base font-normal leading-6 text-neutral-8"
        >
          {content}
        </Description>

        {/* Button area — right-aligned per Figma spec */}
        <div
          data-slot="alert-dialog-actions"
          className="flex flex-row justify-end gap-4 pt-2"
        >
          {dismissAction && (
            <Close
              render={
                <Button
                  variant="neutral"
                  appearance="outline"
                  size="md"
                  onClick={dismissAction.onClick}
                >
                  {dismissAction.label}
                </Button>
              }
            />
          )}
          <Close
            render={
              <Button
                variant={type === "destructive" ? "danger" : "primary"}
                appearance="solid"
                size="md"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            }
          />
        </div>
        </Popup>
      </Portal>
    </Root>
  )
}
