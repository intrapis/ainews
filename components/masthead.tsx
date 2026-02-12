import { Container } from './ui'

export function Masthead({ date }: { date?: string }) {
  const today = date || new Date().toISOString().slice(0, 10)

  return (
    <div className="border-b border-white/10 bg-[#070A12]/60 backdrop-blur">
      <Container>
        <div className="py-5 md:py-7">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs tracking-[0.18em] text-white/60">
              AI NEWS BRIEF · TR
            </div>
            <div className="text-xs text-white/55">{today}</div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-6">
            <a
              href="/ainews"
              className="font-serif text-4xl font-semibold tracking-tight text-white md:text-5xl"
            >
              ainews
            </a>
            <div className="hidden max-w-xl text-right text-sm text-white/60 md:block">
              Newsletter tarzı, hızlı tarama için tasarlanmış günlük brief.
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
