// ─── UI Component Library — Barrel Export ────────────────────────────────────
// Import from here when using multiple components:
//   import { Button, IconButton, AlertDialog } from "@asiayo/ui"
//
// Tree-shaking works correctly when the consuming bundler has
// `"sideEffects": false` set in package.json.
// ─────────────────────────────────────────────────────────────────────────────

// Icon
export type { IconProps, IconType } from "./icon"
export { Icon } from "./icon"

// Alert
export type { AlertType, AlertAction, AlertProps } from "./alert"
export { AlertDialog } from "./alert"

// Announcement
export type { AnnouncementProps } from "./announcement"
export { Announcement } from "./announcement"

// Avatar
export type { AvatarProps } from "./avatar"
export { Avatar } from "./avatar"

// Avatar Group
export type { AvatarGroupProps, AvatarGroupCompactProps, AvatarGroupVariant } from "./avatar-group"
export { AvatarGroup, AvatarGroupCompact } from "./avatar-group"

// Badge
export type { BadgeColor, BadgePlacement, BadgeProps, BadgeAnchorProps } from "./badge"
export { Badge, BadgeDot, BadgeNew, BadgeAnchor } from "./badge"

// Button
export type { ButtonProps } from "./button"
export { Button, buttonVariants } from "./button"

// Checkbox
export type { CheckboxProps } from "./checkbox"
export { Checkbox } from "./checkbox"

// Chip
export type { ChipProps } from "./chip"
export { Chip } from "./chip"

// Date Range Picker
export type { DateRangePickerProps } from "./date-range-picker"
export { DateRangePicker, MonthPanel } from "./date-range-picker"

// Flash Notice
export type { FlashNoticeLink, FlashNoticeProps } from "./flash-notice"
export { FlashNotice, FlashNoticeProvider, useFlashNotice } from "./flash-notice"

// Input
export type { InputProps, FormLabelProps, FormFeedbackProps, InputState, FeedbackType } from "./input"
export { Input, FormLabel, FormFeedback } from "./input"

// Textarea
export type { TextareaProps } from "./textarea"
export { Textarea } from "./textarea"

// Icon Button
export type { IconButtonProps } from "./icon-button"
export { IconButton, iconButtonVariants } from "./icon-button"

// Nav Bar
export type { NavBarProps, NavBarItem, NavItemProps } from "./nav-bar"
export { NavBar, NavItem } from "./nav-bar"

// Number Picker
export type { NumberPickerProps, NumberPickerRowProps } from "./number-picker"
export { NumberPicker, NumberPickerRow } from "./number-picker"

// Page Header
export type { PageHeaderMobileProps, PageHeaderDesktopProps } from "./page-header"
export { PageHeaderMobile, PageHeaderDesktop } from "./page-header"

// Pagination
export type { PaginationProps } from "./pagination"
export { Pagination } from "./pagination"

// Popover
export type { PopoverProps, PopoverPanelProps, PopoverTriggerProps, Placement } from "./popover"
export { Popover, PopoverPanel, PopoverTrigger } from "./popover"

// Radio Button + RadioGroup
export type { RadioButtonProps, RadioGroupProps } from "./radio-button"
export { RadioButton, RadioGroup } from "./radio-button"

// Rating Badge
export type { RatingBadgeProps } from "./rating-badge"
export { RatingBadge } from "./rating-badge"

// Switch
export type { SwitchProps } from "./switch"
export { Switch } from "./switch"

// Tabs
export type { TabsProps, TabItem } from "./tabs"
export { Tabs } from "./tabs"

// Tag
export type { TagProps, SaleTagProps, FilterPillProps } from "./tag"
export { Tag, SaleTag, FilterPill } from "./tag"

// Toast
export type { ToastState, ToastAction, ToastProps, ToastOptions } from "./toast"
export { Toast, ToastProvider, useToast } from "./toast"

// Tooltip
export type { TooltipProps, TooltipStaticProps } from "./tooltip"
export { Tooltip, TooltipStatic } from "./tooltip"
