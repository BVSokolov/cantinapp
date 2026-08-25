import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Button } from '#/components/ui/button'
import { useAppForm } from '#/hooks/demo.form'

export const Route = createFileRoute('/demo/form/simple')({
  component: SimpleForm,
})

enum Station {
  Discovery = 'Discovery',
  Station1 = 'Station 1',
  Station2 = 'Station 2',
  Grill = 'Grill',
}

const mealSlopStationSchema = z.enum(Station)

const mealSloptionSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  station: mealSlopStationSchema,
})

const mealSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  // photo,
  hating: z.number().min(1).max(5),
  sloptions: z.array(mealSloptionSchema).min(1),
  comment: z.string().min(0),
})

function SimpleForm() {
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
      hating: 1,
      sloptions: [{ name: '', station: Station.Discovery }],
      comment: '',
    },
    validators: {
      onBlur: mealSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value)
      // Show success message
      alert('Form submitted successfully!')
    },
  })

  const handleAdd = (index: number) => {
    insertFieldValue('sloptions', index, {
      name: '',
      station: Station.Discovery,
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
            {(field) => <field.TextField label="Title" />}
          </AppField>

          <AppField name="hating">
            {(field) => <field.TextField label="Hating" />}
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
                                  value: Station.Discovery,
                                },
                                { label: 'Station 1', value: Station.Station1 },
                                { label: 'Station 2', value: Station.Station2 },
                                { label: 'Grill', value: Station.Grill },
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
              <SubscribeButton label="Submit" />
            </AppForm>
          </div>
        </form>
      </section>
    </div>
  )
}
