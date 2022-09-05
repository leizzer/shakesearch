import React from 'react'
import TextBlock from './text-block'
import {isMobile} from '../utils'
import styled, {keyframes} from 'styled-components'

const moveGradient = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  5% { transform: translate(-1px, -2px) rotate(-1deg); }
  10% { transform: translate(-3px, 0px) rotate(1deg); }
  15% { transform: translate(3px, 2px) rotate(0deg); }
  20% { transform: translate(1px, -1px) rotate(1deg); }
  25% { transform: translate(-1px, 2px) rotate(-1deg); }
  30% { transform: translate(-3px, 1px) rotate(0deg); }
  40% { transform: translate(0px, 0px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`;

const ShakeEffect = styled(TextBlock)`
  animation: ${moveGradient} 3s ease-out infinite;
`

const Mobile = () => <>Shake it!<br/>Shake your device</>
const Desktop = () => <>Try it on mobile</>

const ShakeIt = () => <ShakeEffect>
  {
    isMobile() ? <Mobile /> : <Desktop />
  }
  <br/>
  Shake Search!!
</ShakeEffect>

export default ShakeIt
