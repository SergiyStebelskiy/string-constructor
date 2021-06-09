import s from "./StringForm.module.scss"
import { useFormik } from "formik"
import { object, string, number } from "yup"
import { TextField, Button } from "@material-ui/core"

const StringForm = ({ onSubmit, onReset }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      percent: 0
    },
    validationSchema: object({
      name: string()
        .required("Please, type something.")
        .max(220, "String is too long."),
      percent: number()
        .required("Please, type percent")
        .min(0, "Percent should be > 0")
        .max(100, "Percent should be <= 100")
    }),
    onSubmit
  })
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleReset
  } = formik
  return (
    <form
      className={s.form}
      onSubmit={handleSubmit}
      autoComplete='off'
      noValidate
    >
      <TextField
        value={values.name}
        onChange={handleChange}
        name='name'
        label='Text'
        variant='outlined'
        className={s.name}
        error={errors.name && touched.name && Boolean(errors.name)}
        helperText={errors.name && touched.name && errors.name}
      />
      <TextField
        value={values.percent}
        onChange={handleChange}
        name='percent'
        label='Percent'
        type='number'
        variant='outlined'
        className={s.percent}
        error={errors.percent && touched.percent && Boolean(errors.percent)}
        helperText={errors.percent && touched.percent && errors.percent}
      />
      <div className={s.btns}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={s.save}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            handleReset()
            onReset()
          }}
          variant='contained'
          color='primary'
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
export default StringForm
