import { motion, useScroll, useTransform } from 'motion/react'
import React from 'react'

function DynamicBorder() {

  const {scrollY} = useScroll()
  const opacity = useTransform(scrollY, [0, 300],[0, 1] )
  return (
    <motion.hr className='' style={{opacity}} />
  )
}

export default DynamicBorder