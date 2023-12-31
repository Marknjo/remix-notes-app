import { useMemo } from 'react'
import type { LinksFunction } from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import styles from './NewNote.css'

export type TErrors = Array<{
  type: string
  title: string | null
  description: string | null
}>

type TNormalizedError = {
  type: string
  message: string
}
type TNormalizedErrors = Array<TNormalizedError>

function normalizeErrors(errors: TErrors | undefined) {
  let titleErrors: TNormalizedErrors | [] = []
  let descriptionErrors: TNormalizedErrors | [] = []

  if (!errors) {
    return {
      titleErrors,
      descriptionErrors,
    }
  }

  const titleErrorsF = errors.filter(error => error.title)

  const descriptionErrorsF = errors.filter(error => error.description) || []

  if (titleErrorsF.length > 0) {
    titleErrors = titleErrorsF.map(error => ({
      type: error.type,
      message: error.title,
    })) as Array<{ type: string; message: string }>
  }

  if (descriptionErrorsF.length > 0) {
    descriptionErrors = descriptionErrorsF.map(error => ({
      type: error.type,
      message: error.description,
    })) as Array<{ type: string; message: string }>
  }

  return {
    titleErrors,
    descriptionErrors,
  }
}

function ErrorField({
  errors,
  fieldId,
}: {
  errors: TNormalizedErrors
  fieldId: string
}) {
  if (errors.length === 0) return null
  return (
    <>
      {errors.map(error => (
        <em key={error.type} className="error-field" id={fieldId} role="alert">
          {error.message}
        </em>
      ))}
    </>
  )
}

function NewNote() {
  const navigation = useNavigation()
  const actionData = useActionData<{
    values: { title: string; description: string }
    errors: TErrors | undefined
  }>()

  const { titleErrors, descriptionErrors } = useMemo(
    () => normalizeErrors(actionData?.errors),
    [actionData?.errors],
  )

  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className={titleErrors.length > 0 ? 'errored-field' : ''}
          aria-errormessage={titleErrors.length > 0 ? 'title-error' : undefined}
          aria-invalid={Boolean(titleErrors.length > 0)}
        />
        <ErrorField errors={titleErrors} fieldId="title-error" />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          className={descriptionErrors.length > 0 ? 'errored-field' : ''}
          aria-invalid={Boolean(descriptionErrors.length > 0)}
          aria-errormessage={
            descriptionErrors.length > 0 ? 'description-error' : undefined
          }
        />
        <ErrorField errors={descriptionErrors} fieldId="description-error" />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting || false}>
          {isSubmitting ? 'Adding Note...' : 'Add Note'}
        </button>
      </div>
    </Form>
  )
}

export default NewNote

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}
