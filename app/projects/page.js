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

export default async function Projects({ searchParams }) {
  const user = await currentUser();
  // ?open=<project id> opens that project's directions (from Continue links).
  const { open: openId } = await searchParams;
  const saved = user
    ? await sql`
        select id, name, craft, materials, steps, details, tip
        from projects
        where user_id = ${user.id}
        order by created_at
      `
    : [];

  // The user's step checkmarks and counters, keyed by project id.
  const progressRows = user
    ? await sql`
        select project_key, completed_steps, row_count, stitch_count
        from project_progress where user_id = ${user.id}
      `
    : [];
  const progress = Object.fromEntries(
    progressRows.map((row) => [
      row.project_key,
      {
        completedSteps: row.completed_steps,
        rowCount: row.row_count,
        stitchCount: row.stitch_count,
      },
    ]),
  );
  const tracking = { signedIn: Boolean(user), initialProgress: progress, openId };

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
            <ProjectGrid projects={saved} showAdd {...tracking} />
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
          step-by-step directions, then check off steps and count rows as you
          go.
        </p>
        {crafts.map((craft) => (
          <div key={craft} className="starter-group">
            <h3>{craft}</h3>
            <ProjectGrid
              projects={starterProjects.filter((p) => p.craft === craft)}
              badge="Beginner"
              {...tracking}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
