import React, { FC } from 'react'
import ProtectedRoute from './ProtectedRoute'

const AboutPage:FC = () => {
  return (
    <ProtectedRoute>
        <div>AboutPage</div>
    </ProtectedRoute>
  )
}

export default AboutPage