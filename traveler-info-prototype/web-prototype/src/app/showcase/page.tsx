// ─── 已對齊元件 ──────────────────────────────────────────────────────────────
import { AlertSection } from "../_sections/AlertSection"
import { AnnouncementSection } from "../_sections/AnnouncementSection"
import { AvatarSection } from "../_sections/AvatarSection"
import { BadgeSection } from "../_sections/BadgeSection"
import { ButtonSection } from "../_sections/ButtonSection"
import { IconButtonSection } from "../_sections/IconButtonSection"
import { NumberPickerSection } from "../_sections/NumberPickerSection"
import { FlashNoticeSection } from "../_sections/FlashNoticeSection"
import { CheckboxSection } from "../_sections/CheckboxSection"
import { RadioButtonSection } from "../_sections/RadioButtonSection"
import { ChipSection } from "../_sections/ChipSection"
import { TextareaSection } from "../_sections/TextareaSection"

// ─── 待對齊元件 ──────────────────────────────────────────────────────────────
import { DateRangePickerSection } from "../_sections/DateRangePickerSection"
import { FormSection } from "../_sections/FormSection"
import { NavSection } from "../_sections/NavSection"
import { PaginationSection } from "../_sections/PaginationSection"
import { PopoverSection } from "../_sections/PopoverSection"
import { RatingBadgeSection } from "../_sections/RatingBadgeSection"
import { SwitchSection } from "../_sections/SwitchSection"
import { TagSection } from "../_sections/TagSection"
import { ToastSection } from "../_sections/ToastSection"
import { TooltipSection } from "../_sections/TooltipSection"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] py-10">
      <div className="max-w-2xl mx-auto px-4 flex flex-col gap-10">

        {/* ── 已對齊元件 ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-white bg-success-6 px-2 py-1 rounded">✅ 已對齊</span>
          <div className="flex-1 border-t border-success-6/30" />
        </div>

        <AlertSection />
        <AnnouncementSection />
        <AvatarSection />
        <BadgeSection />
        <ButtonSection />
        <IconButtonSection />
        <NumberPickerSection />
        <FlashNoticeSection />
        <CheckboxSection />
        <RadioButtonSection />
        <ChipSection />
        <TextareaSection />

        {/* ── 待對齊元件 ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs font-medium text-white bg-neutral-6 px-2 py-1 rounded">⏳ 待對齊</span>
          <div className="flex-1 border-t border-neutral-6/30" />
        </div>

        <DateRangePickerSection />
        <FormSection />
        <NavSection />
        <PaginationSection />
        <PopoverSection />
        <RatingBadgeSection />
        <SwitchSection />
        <TagSection />
        <ToastSection />
        <TooltipSection />

      </div>
    </main>
  )
}
