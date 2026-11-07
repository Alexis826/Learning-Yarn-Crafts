import { CrochetHook, KnittingNeedles } from "../about/Illustrations";
import { crochetLessons, knittingLessons } from "./lessons";
import StepImages from "./StepImages";

export const metadata = {
  title: "Tutorials | Cozy Loops",
};

function LessonList({ lessons }) {
  return lessons.map((lesson, index) => (
    <article key={lesson.id} id={lesson.id} className="lesson">
      <h3>
        <span className="lesson-number">Lesson {index + 1}</span>
        {lesson.title}
      </h3>
      <StepImages lessonId={lesson.id} />
      <div className="lesson-text">
        <p>{lesson.summary}</p>
        <h4>How to do it</h4>
        <ol>
          {lesson.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </article>
  ));
}

export default function Tutorials() {
  return (
    <main className="tutorials">
      <h1>Tutorials</h1>
      <p className="intro">
        Start from the very beginning. Each lesson has step-by-step pictures
        and written steps you can follow at your own pace. Gold yarn in the
        pictures shows the move you make in that step. Crochet terms are in
        US terminology.
      </p>
      <nav className="jump-links" aria-label="Tutorial sections">
        <a href="#crochet">Crochet</a>
        <a href="#knitting">Knitting</a>
      </nav>

      <section id="crochet" className="tutorial-section">
        <div className="section-heading">
          <div className="section-art">
            <CrochetHook />
          </div>
          <h2>Crochet Basics</h2>
        </div>
        <LessonList lessons={crochetLessons} />
      </section>

      <section id="knitting" className="tutorial-section">
        <div className="section-heading">
          <div className="section-art">
            <KnittingNeedles />
          </div>
          <h2>Knitting Basics</h2>
        </div>
        <LessonList lessons={knittingLessons} />
      </section>
    </main>
  );
}
