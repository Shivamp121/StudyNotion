import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instruction || [])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Input + Add Button */}
      <div className="flex w-full flex-col sm:flex-row sm:items-center sm:gap-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder={`Add a ${label.toLowerCase()}`}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="mt-2 sm:mt-0 rounded-md bg-yellow-50 px-4 py-2 text-black font-semibold hover:bg-yellow-400 transition-all"
        >
          Add
        </button>
      </div>

      {/* List of Requirements */}
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 w-full">
          {requirementsList.map((req, index) => (
            <li
              key={index}
              className="flex flex-wrap items-center justify-between gap-2 text-richblack-5 bg-richblack-700 px-3 py-1 rounded-md"
            >
              <span>{req}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pink-200 hover:text-pink-400 transition-all"
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Validation Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
