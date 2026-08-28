import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '#/components/ui/button'
import { toast } from '#/components/ui/toast'
import { useAppForm } from '#/hooks/demo.form'
import { MealStationEnum, mealSchema } from '#/lib/types/meal'
import { addMeal } from '#/serverActions/mealActions'

export const Route = createFileRoute('/demo/form/simple')({
  component: SimpleForm,
})

function SimpleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    AppField,
    AppForm,
    SubscribeButton,
    handleSubmit,
    insertFieldValue,
    removeFieldValue,
  } = useAppForm({
    defaultValues: {
      title: '',
      hating: '1',
      sloptions: [{ name: '', station: MealStationEnum.Discovery }],
      comment: '',
    },
    validators: {
      onBlur: mealSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      if (isSubmitting) return
      try {
        setIsSubmitting(true)
        await addMeal({ data: value })
        toast.add({
          title: 'Success',
          description: 'Meal added successfully',
          type: 'success',
        })
      } catch (error) {
        toast.add({
          title: 'Failed to add meal',
          description: error instanceof Error ? error.message : String(error),
          type: 'error',
        })
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleAdd = (index: number) => {
    insertFieldValue('sloptions', index, {
      name: '',
      station: MealStationEnum.Discovery,
    })
  }
  const handleRemove = (index: number) => {
    removeFieldValue('sloptions', index)
  }

  return (
    <div>
      <section className="demo-panel w-full">
        <div className="mb-6">
          <p className="island-kicker mb-2">Meal Review</p>
          <p className="demo-muted mt-2">Share about the meal</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="space-y-6"
        >
          <AppField name="title">
            {(field) => (
              <field.TextField label="Title">
                <AppField name="hating">
                  {(field) => (
                    <field.Select
                      label="Hating"
                      displayLabel
                      minContent
                      values={[
                        { label: '🙂', value: '1' },
                        { label: '🥲', value: '2' },
                        { label: '😵‍💫', value: '3' },
                        { label: '🤢', value: '4' },
                        { label: '🤮', value: '5' },
                      ]}
                    />
                  )}
                </AppField>
              </field.TextField>
            )}
          </AppField>

          <AppField name="sloptions" mode="array">
            {(field) => (
              <div className="space-y-3">
                {field.state.value.map((_item, index) => (
                  <AppField name={`sloptions[${index}].name`}>
                    {(field) => (
                      <field.TextField label={`Sloption #${index + 1}`}>
                        <AppField name={`sloptions[${index}].station`}>
                          {(field) => (
                            <field.Select
                              label="Station"
                              values={[
                                {
                                  label: 'Discovery',
                                  value: MealStationEnum.Discovery,
                                },
                                {
                                  label: 'Station 1',
                                  value: MealStationEnum.Station1,
                                },
                                {
                                  label: 'Station 2',
                                  value: MealStationEnum.Station2,
                                },
                                {
                                  label: 'Grill',
                                  value: MealStationEnum.Grill,
                                },
                              ]}
                            />
                          )}
                        </AppField>
                        <Button
                          type="button"
                          onClick={() => handleAdd(index + 1)}
                        >
                          &#x2b;
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemove(index)}
                        >
                          &#x2212;
                        </Button>
                      </field.TextField>
                    )}
                  </AppField>
                ))}
              </div>
            )}
          </AppField>

          <AppField name="comment">
            {(field) => <field.TextArea label="Comment" />}
          </AppField>

          <div className="flex justify-end">
            <AppForm>
              <SubscribeButton
                label={isSubmitting ? 'Submitting...' : 'Submit'}
              />
            </AppForm>
          </div>
        </form>
      </section>
    </div>
  )
}
