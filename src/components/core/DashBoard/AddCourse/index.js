import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <div className="flex w-full flex-col lg:flex-row gap-8 lg:gap-6 px-4 lg:px-8 py-6">
      {/* Main Content */}
      <div className="w-full lg:w-[60%] max-w-full lg:max-w-[600px] flex flex-col">
        <h1 className="mb-8 text-3xl font-medium text-richblack-5">
          Add Course
        </h1>
        <RenderSteps />
      </div>

      {/* Course Upload Tips */}
      <div className="w-full lg:w-[40%] max-w-full lg:max-w-[400px]">
        <div className="bg-richblack-800 rounded-lg p-5">
          <p className="mb-6 text-lg text-richblack-5 font-semibold">
            ⚡ Course Upload Tips
          </p>
          <ul className="ml-5 list-disc space-y-3 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important info.</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
