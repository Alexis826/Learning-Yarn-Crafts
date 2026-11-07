import { stepDiagrams } from "./stepDiagrams";

// The numbered step-by-step pictures shown at the top of a lesson.
export default function StepImages({ lessonId }) {
  const steps = stepDiagrams[lessonId] || [];

  return (
    <ol className="step-images">
      {steps.map((step, index) => (
        <li key={step.caption}>
          <figure>
            <svg viewBox="0 0 240 150" role="img" aria-label={step.caption}>
              {step.art}
            </svg>
            <figcaption>
              <span className="step-number">Step {index + 1}</span>
              {step.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  );
}
