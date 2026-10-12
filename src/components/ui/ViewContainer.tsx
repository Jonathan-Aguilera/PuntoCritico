import { type ReactNode } from 'react'

interface ViewContainerProps {
  children?: ReactNode
}

export default function ViewContainer({ children }: ViewContainerProps) {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-9 md:py-12 xl:px-6">
        {children}
      </div>
    </div>
  )
}