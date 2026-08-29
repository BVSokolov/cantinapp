import { useSelector } from '@tanstack/react-form'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import * as ShadcnSelect from '#/components/ui/select'
import { Slider as ShadcnSlider } from '#/components/ui/slider'
import { Switch as ShadcnSwitch } from '#/components/ui/switch'
import { Textarea as ShadcnTextarea } from '#/components/ui/textarea'
import { useFieldContext, useFormContext } from '#/hooks/demo.form-context'
import { cn } from '#/lib/utils'

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === 'string' ? error : error.message}
          className="mt-1 text-sm font-semibold text-red-600"
        >
          {typeof error === 'string' ? error : error.message}
        </div>
      ))}
    </>
  )
}

export function TextField({
  label,
  placeholder,
  children,
}: {
  label: string
  placeholder?: string
  children?: React.ReactNode
}) {
  const field = useFieldContext<string>()
  const errors = useSelector(field.store, (state) => state.meta.errors)

  return (
    <div>
      <Label
        htmlFor={label}
        className="mb-2 text-sm font-semibold text-[var(--sea-ink)]"
      >
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        {children}
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

export function TextArea({
  label,
  rows = 3,
}: {
  label: string
  rows?: number
}) {
  const field = useFieldContext<string>()
  const errors = useSelector(field.store, (state) => state.meta.errors)

  return (
    <div>
      <Label
        htmlFor={label}
        className="mb-2 text-sm font-semibold text-[var(--sea-ink)]"
      >
        {label}
      </Label>
      <ShadcnTextarea
        id={label}
        value={field.state.value}
        onBlur={field.handleBlur}
        rows={rows}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

export function Select({
  label,
  values,
  placeholder,
  displayLabel = false,
  minContent = false,
}: {
  label: string
  values: Array<{ label: string; value: string }>
  placeholder?: string
  displayLabel?: boolean
  minContent?: boolean
}) {
  const field = useFieldContext<string>()
  const errors = useSelector(field.store, (state) => state.meta.errors)

  return (
    <div>
      <ShadcnSelect.Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value ?? '')}
      >
        <ShadcnSelect.SelectTrigger className="w-full">
          <ShadcnSelect.SelectValue placeholder={placeholder}>
            {displayLabel
              ? values.find((value) => value.value === field.state.value)?.label
              : field.state.value}
          </ShadcnSelect.SelectValue>
        </ShadcnSelect.SelectTrigger>
        <ShadcnSelect.SelectContent
          className={cn(
            minContent && 'min-w-min w-min',
            'bg-background text-foreground',
          )}
        >
          <ShadcnSelect.SelectGroup
          // className={cn(minContent ? 'w-min min-w-min' : '')}
          >
            <ShadcnSelect.SelectLabel
            // className={cn(minContent ? 'w-min min-w-min' : '')}
            >
              {label}
            </ShadcnSelect.SelectLabel>
            {values.map((value) => (
              <ShadcnSelect.SelectItem
                key={value.value}
                value={value.value}
                className={cn(
                  // minContent && 'w-min min-w-min',
                  'text-foreground',
                )}
              >
                {value.label}
              </ShadcnSelect.SelectItem>
            ))}
          </ShadcnSelect.SelectGroup>
        </ShadcnSelect.SelectContent>
      </ShadcnSelect.Select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

export function Slider({ label }: { label: string }) {
  const field = useFieldContext<number>()
  const errors = useSelector(field.store, (state) => state.meta.errors)

  return (
    <div>
      <Label
        htmlFor={label}
        className="mb-2 text-sm font-semibold text-[var(--sea-ink)]"
      >
        {label}
      </Label>
      <ShadcnSlider
        id={label}
        onBlur={field.handleBlur}
        value={[field.state.value]}
        onValueChange={(value) => field.handleChange(value[0])}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

export function Switch({ label }: { label: string }) {
  const field = useFieldContext<boolean>()
  const errors = useSelector(field.store, (state) => state.meta.errors)

  return (
    <div>
      <div className="flex items-center gap-2">
        <ShadcnSwitch
          id={label}
          onBlur={field.handleBlur}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked)}
        />
        <Label htmlFor={label}>{label}</Label>
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}
