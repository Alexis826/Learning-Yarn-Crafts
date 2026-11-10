import Link from "next/link";
import { currentUser } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import ProjectGrid from "./ProjectGrid";

export const metadata = {
  title: "Projects | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";

export default async function Projects() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="projects">
        <h1>Projects</h1>
        <div className="signup-notice">
          <h2>Sign in to see your projects</h2>
          <p>
            Your projects are saved to your account, so you can open them from
            any device.
          </p>
          <Link href="/sign-in" className="button">
            Sign in
          </Link>
          <p className="form-switch">
            New here? <Link href="/get-started">Create an account</Link>
          </p>
        </div>
      </main>
    );
  }

  const saved = await sql`
    select id, name, craft, materials, steps
    from projects
    where user_id = ${user.id}
    order by created_at
  `;

  return (
    <main className="projects">
      <h1>Projects</h1>
      <p>
        Instructions Loopy writes from your photos and videos are saved here.
        Click a project to open its directions.
      </p>
      <ProjectGrid saved={saved} />
    </main>
  );
}
