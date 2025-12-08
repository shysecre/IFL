'use client'

import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/app/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type Option = { label: string; value: string }

interface ISelectProps {
  placeholder: string
  options: Option[]
  selectedOptions: string[]
  setSelectedOptions: Dispatch<SetStateAction<string[]>>
  disabled: boolean
}
export const MultiSelect = ({
  placeholder,
  options: values,
  selectedOptions: selectedItems,
  setSelectedOptions: setSelectedItems,
  disabled = false,
}: ISelectProps) => {
  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value])
    } else {
      const referencedArray = [...selectedItems]
      const indexOfItemToBeRemoved = referencedArray.indexOf(value)
      referencedArray.splice(indexOfItemToBeRemoved, 1)
      setSelectedItems(referencedArray)
    }
  }

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center justify-between">
          <div>{placeholder}</div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
        {values.map((value: ISelectProps['options'][0], index: number) => {
          return (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.value)}
              onCheckedChange={() => handleSelectChange(value.value)}
              disabled={disabled}
            >
              {value.label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
