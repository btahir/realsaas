'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUser } from 'lucide-react'
import { Button } from '@/components/ui/button'

function UserDropdown({ serverActions, subscriptionId }: any) {
  async function handleChange(e: any) {
    await serverActions(e.target.innerText)
  }

  return (
    <form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' className='rounded-full flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-400'>
            <CircleUser className='h-5 w-5' />
            <span className='hidden sm:inline-block'>Account</span>
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleChange}>Account</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleChange} disabled={!subscriptionId}>
            Manage Subscription
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleChange}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  )
}

export default UserDropdown
