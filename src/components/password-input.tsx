'use client'

import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PasswordInput = ({name}: {name: string}) => {
  const [isVisible, setIsVisible] = useState(true)


  return (
      <div className='relative flex flex-row'>
        <Input name={name} aria-label={(name.includes("name"))? "name": name} type={isVisible ? 'text' : 'password'} role="textbox" placeholder='Password' className='pr-9'/>
        <Button
          type="button"
          variant='ghost'
          size='icon'
          onClick={() => setIsVisible(prevState => !prevState)}
          className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
  )
}

export default PasswordInput
