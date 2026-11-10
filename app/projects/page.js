import Link from "next/link";
import { currentUser } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import ProjectGrid from "./ProjectGrid";
import { starterProjects } from "./starterProjects";

export const metadata = {
  title: "Projects | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";

const crafts = ["Crochet", "Knitting"];

export default async function Projects() {
  const user = await currentUser();
  const saved = user
    ? await sql`
        select id, name, craft, materials, steps
        from projects
        where user_id = ${user.id}
        order by created_at
      `
    : [];

  return (
    <main className="projects">
      <h1>Projects</h1>

      <section className="project-section" aria-labelledby="my-projects-heading">
        <h2 id="my-projects-heading">My projects</h2>
        {user ? (
          <>
            <p>
              Instructions Loopy writes from your photos and videos are saved
              here. Click a project to open its directions.
            </p>
            <ProjectGrid projects={saved} showAdd />
          </>
        ) : (
          <div className="signup-notice">
            <h3>Sign in to see your projects</h3>
            <p>
              Your projects are saved to your account, so you can open them
              from any device.
            </p>
            <Link href="/sign-in" className="button">
              Sign in
            </Link>
            <p className="form-switch">
              New here? <Link href="/get-started">Create an account</Link>
            </p>
          </div>
        )}
      </section>

      <section className="project-section" aria-labelledby="starter-heading">
        <h2 id="starter-heading">Beginner projects</h2>
        <p>
          Quick, easy projects to practice your new skills. Each one takes a
          couple of hours or less. Click a project for the yarn, tools and
          step-by-step directions.
        </p>
        {crafts.map((craft) => (
          <div key={craft} className="starter-group">
            <h3>{craft}</h3>
            <ProjectGrid
              projects={starterProjects.filter((p) => p.craft === craft)}
              badge="Beginner"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
