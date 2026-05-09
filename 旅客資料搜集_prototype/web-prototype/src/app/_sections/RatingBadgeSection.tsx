"use client"
import { RatingBadge } from "@/components/ui/rating-badge"
import { BadgeAnchor } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"

export function RatingBadgeSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Rating Badge</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Score only</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <RatingBadge score={4.8} />
          <RatingBadge score={4.0} />
          <RatingBadge score={3.5} />
          <RatingBadge score={2.9} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Score + comment count</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <RatingBadge score={4.8} commentCount={128} />
          <RatingBadge score={4.0} commentCount={37} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Score + grading</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <RatingBadge score={4.8} showGrading />
          <RatingBadge score={4.2} showGrading />
          <RatingBadge score={3.7} showGrading />
          <RatingBadge score={3.1} showGrading />
          <RatingBadge score={2.5} showGrading />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Score + grading + comment count</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <RatingBadge score={4.8} showGrading commentCount={128} />
          <RatingBadge score={3.7} showGrading commentCount={42} />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Placement — on avatar</h2>
        <div className="flex flex-wrap gap-8 items-center">
          <BadgeAnchor value={3} color="primary">
            <Avatar name="Anita" size={44} />
          </BadgeAnchor>
          <BadgeAnchor color="danger">
            <Avatar src="https://i.pravatar.cc/150?img=5" size={44} />
          </BadgeAnchor>
        </div>
      </section>
    </>
  )
}
