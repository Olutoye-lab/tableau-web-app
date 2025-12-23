"use client"

export function DashedLine() {
  return (
    <div className="relative w-0.5 h-7 overflow-hidden bg-transparent">
      <div className="absolute inset-0 border-l-2 border-green-500 border-dashed animate-dash" />
      <style jsx>{`
        @keyframes dash {
          from {
            transform: translateY(-12px);
          }
          to {
            transform: translateY(0px);
          }
        }
        .animate-dash {
          animation: dash 0.6s linear infinite;
        }
      `}</style>
    </div>
  )
}
