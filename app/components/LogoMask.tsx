'use client'

interface LogoMaskProps {
  className?: string
}

export default function LogoMask({ className = '' }: LogoMaskProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 200"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
            text { font-family: 'Montserrat', sans-serif; }
          `}
        </style>
      </defs>
      <text
        x="400"
        y="120"
        fontSize="120"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        FINT HJEM
      </text>
    </svg>
  )
}
