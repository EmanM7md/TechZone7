import React from 'react'
import { motion } from 'framer-motion'

export default function Pagetransition({children}) {
  return (
    <motion.div 
    initial={{opacity:0,y:20}} //start point
    animate={{opacity:1,y:0}} // end point
    exit={{opacity:0, y:-20}} // end point
    transition={{duration:0.3}}
    >
      
      {children}

    </motion.div>
  )
}
