import { ImageResponse } from 'next/og'
import { Leaf } from 'lucide-react'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* We pass the lucide icon here! */}
        <Leaf size={24} color="#16a34a" strokeWidth={2.5} />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
