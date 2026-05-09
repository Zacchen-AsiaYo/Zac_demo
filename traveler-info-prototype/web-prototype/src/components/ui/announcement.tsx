import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

// ─── Announcement ─────────────────────────────────────────────────────────────
// Figma spec (extracted from SVG):
//   bg:     primary-1 / warning-1 / success-1
//   border: 1px, variant-6 at 16% opacity
//   icon:   variant-6
//   title:  variant-7 (darker shade of the state color)
//   body:   neutral-7
//   close:  IconButton flat, variant matches announcement variant

const announcementVariants = cva(
  "flex w-full items-stretch border",
  {
    variants: {
      variant: {
        primary: "bg-primary-1 border-primary-6/[0.16]",
        warning:  "bg-warning-1  border-warning-6/[0.16]",
        success:  "bg-success-1  border-success-6/[0.16]",
      },
    },
    defaultVariants: { variant: "primary" },
  }
)

const titleColor = {
  primary: "text-primary-7",
  warning:  "text-warning-7",
  success:  "text-success-7",
} as const

const iconColor = {
  primary: "text-primary-6",
  warning:  "text-warning-6",
  success:  "text-success-6",
} as const

export interface AnnouncementProps
  extends VariantProps<typeof announcementVariants> {
  title: string
  content?: string
  onClose?: () => void
  className?: string
}

export function Announcement({
  variant = "primary",
  title,
  content,
  onClose,
  className,
}: AnnouncementProps) {
  const v = variant ?? "primary"

  return (
    <div
      role="alert"
      data-slot="announcement"
      className={cn(announcementVariants({ variant }), className)}
    >
      {/* Icon area — 40px wide, top-aligned at 18px from top */}
      <div
        data-slot="announcement-icon"
        className={cn(
          "pl-4 pr-2 flex items-start pt-[18px] shrink-0",
          iconColor[v]
        )}
      >
        <AlertCircle size={24} aria-hidden />
      </div>

      {/* Content — flex-1, 16px top/bottom padding, 8px gap between title & body */}
      <div
        data-slot="announcement-content"
        className={cn(
          "flex flex-col flex-1 py-4 gap-2",
          onClose ? "pr-0" : "pr-4"
        )}
      >
        <p
          data-slot="announcement-title"
          className={cn("text-base font-medium leading-6", titleColor[v])}
        >
          {title}
        </p>
        {content && (
          <p
            data-slot="announcement-body"
            className="text-sm font-normal leading-5 text-neutral-7"
          >
            {content}
          </p>
        )}
      </div>

      {/* Close button — only rendered when onClose is provided */}
      {onClose && (
        <div
          data-slot="announcement-close"
          className="w-[52px] pt-1 pr-1 flex items-start shrink-0"
        >
          <IconButton
            variant={v}
            appearance="flat"
            size="lg"
            aria-label="關閉"
            onClick={onClose}
          >
            <Icon name="times" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
