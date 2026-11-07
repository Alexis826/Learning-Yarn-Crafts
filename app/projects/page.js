import ProjectGrid from "./ProjectGrid";

export const metadata = {
  title: "Projects | Cozy Loops",
};

export default function Projects() {
  return (
    <main className="projects">
      <h1>Projects</h1>
      <p>
        Instructions Loopy writes from your photos and videos are saved here.
        Click a project to open its directions.
      </p>
      <ProjectGrid />
    </main>
  );
}
