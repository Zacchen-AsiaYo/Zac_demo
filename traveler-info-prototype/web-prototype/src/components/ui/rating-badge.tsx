import { cn } from "@/lib/utils"

// Grading labels mapped to score ranges (from Figma spec)
// 很棒 4.5~5 | 不錯 4.0~4.4 | 還可以 3.5~3.9 | 一般 3.0~3.4 | 差 <3
function getGrading(score: number): string {
  if (score >= 4.5) return "很棒"
  if (score >= 4.0) return "不錯"
  if (score >= 3.5) return "還可以"
  if (score >= 3.0) return "一般"
  return "差"
}

export interface RatingBadgeProps {
  score: number
  outOf?: number
  commentCount?: number
  showGrading?: boolean
  className?: string
}

export function RatingBadge({
  score,
  outOf = 5,
  commentCount,
  showGrading = false,
  className,
}: RatingBadgeProps) {
  const displayScore = score.toFixed(1).replace(/\.0$/, "")

  return (
    <div
      data-slot="rating-badge"
      className={cn("inline-flex items-center gap-1", className)}
    >
      {/* Score section: colored pill + denominator */}
      <div className="inline-flex items-center gap-0.5">
        {/* Score pill */}
        <div className="inline-flex items-center justify-center h-6 px-1 rounded-[4px] bg-[#1e9fd2]">
          <span className="text-white text-base font-normal leading-6">
            {displayScore}
          </span>
        </div>
        {/* Denominator */}
        <span className="text-[#8c8c8c] text-base font-normal leading-6">
          /{outOf}
        </span>
      </div>

      {/* Grading label */}
      {showGrading && (
        <span className="text-[#1e9fd2] text-base font-normal leading-6">
          {getGrading(score)}
        </span>
      )}

      {/* Comment count */}
      {commentCount !== undefined && (
        <span className="text-[#1e9fd2] text-base font-normal leading-6">
          ({commentCount})
        </span>
      )}
    </div>
  )
}
