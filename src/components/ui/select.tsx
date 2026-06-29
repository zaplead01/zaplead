
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/src/lib/utils"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "flex flex-1 items-center truncate text-left",
        className
      )}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        {children}
      </div>

      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | "align"
    | "alignOffset"
    | "side"
    | "sideOffset"
    | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "z-50 max-h-80 w-(--anchor-width) overflow-auto rounded-lg border bg-popover p-1 shadow-lg",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(
        "px-2 py-1 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1">
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator
        render={
          <span className="absolute right-2">
            <CheckIcon className="h-4 w-4" />
          </span>
        }
      />
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton(
  props: React.ComponentProps<
    typeof SelectPrimitive.ScrollUpArrow
  >
) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className="flex justify-center py-1"
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton(
  props: React.ComponentProps<
    typeof SelectPrimitive.ScrollDownArrow
  >
) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className="flex justify-center py-1"
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

