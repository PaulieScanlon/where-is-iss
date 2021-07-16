import React, { FunctionComponent } from 'react'
import { Box, ThemeUIStyleObject } from 'theme-ui'

interface IOctocatProps {
  /** Theme UI JSX pragma */
  sx?: ThemeUIStyleObject
}

export const Octocat: FunctionComponent<IOctocatProps> = ({ sx }) => {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50.2,2.3c-27,0-48.9,21.9-48.9,48.9c0,21.6,14,39.9,33.4,46.4
	c2.4,0.4,3.3-1.1,3.3-2.4c0-1.2,0-4.2-0.1-8.3c-13.6,3-16.5-6.6-16.5-6.6c-2.2-5.6-5.4-7.2-5.4-7.2c-4.4-3,0.3-3,0.3-3
	c4.9,0.3,7.5,5,7.5,5c4.4,7.5,11.4,5.3,14.2,4.1c0.4-3.2,1.7-5.3,3.1-6.5C30.5,71.5,19,67.3,19,48.6c0-5.3,1.9-9.7,5-13.1
	c-0.5-1.2-2.2-6.2,0.5-12.9c0,0,4.1-1.3,13.4,5c3.9-1.1,8.1-1.6,12.2-1.6c4.2,0,8.3,0.6,12.2,1.6c9.3-6.3,13.4-5,13.4-5
	c2.7,6.7,1,11.7,0.5,12.9c3.1,3.4,5,7.8,5,13.1c0,18.8-11.4,22.9-22.3,24.1c1.8,1.5,3.3,4.5,3.3,9.1c0,6.5-0.1,11.8-0.1,13.4
	c0,1.3,0.9,2.8,3.4,2.4c19.4-6.5,33.4-24.8,33.4-46.4C99.1,24.1,77.2,2.3,50.2,2.3z"
        />
      </svg>
    </Box>
  )
}
