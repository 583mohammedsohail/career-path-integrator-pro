
import * as React from "react"
import { OTPInput, OTPInputContext, SlotProps } from "input-otp"
import { cn } from "@/lib/utils"

interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}


const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ value, onChange, maxLength = 6 }, ref) => (
    <OTPInput
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      render={({ slots }) => (
        <div ref={ref} className="flex gap-2">
          {slots.map((slot: SlotProps, idx: number) => (
            <div key={idx}>
              <input
                {...slot}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={cn(
                  "w-10 h-10 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                  "text-black dark:text-white bg-background"
                )}
                onInput={(e) => {
                  // Ensure only numbers are entered
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9]/g, '');
                }}
              />
            </div>
          ))}
        </div>
      )}
    />
  )
)

InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, isActive } = inputOTPContext?.slots?.[index] || {}

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-9 w-9 rounded-md border",
        isActive && "border-primary ring-2 ring-primary",
        className
      )}
      {...props}
    >
      <input
        className={cn(
          "absolute h-full w-full rounded-md p-0 text-center text-base",
          "text-black dark:text-white bg-background"
        )}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={char || ""}
        readOnly={true}
        {...props}
      />
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <div className="h-4 w-4 text-muted-foreground">•</div>
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
