import Link from "next/link";
import { bethEllen } from "./fonts";
import { plans } from "./plans";

const features = [
  {
    title: "Knitting & Crochet",
    text: "Learn basic terms and stitches that will work up to the cozy items you've dreamed of: blankets, sweaters, knick-knacks and more!",
  },
  {
    title: "Tutorials",
    text: "Use basic tutorials that help you build beginner skills a couple stitches at a time.",
  },
  {
    title: "Ask Loopy",
    text: "Have a pattern that's hard to read or don't know what materials to use? Ask Loopy to help.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1 className={bethEllen.className}>
          Get crafty, make the project of your dreams
        </h1>
        <p>
          Cozy Loops helps beginners learn knitting and crochet. Find
          step-by-step guides, simple starter projects, and tips for choosing
          the right yarn, needles, and hooks.
        </p>
      </section>

      <section className="features" aria-label="What you'll find">
        {features.map((feature) => (
          <div key={feature.title} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>

      <section className="plans" aria-labelledby="plans-heading">
        <h2 id="plans-heading">Plans</h2>
        <div className="plan-grid">
          {plans.map((plan) => (
            <div key={plan.name} className="plan">
              <h3>{plan.name}</h3>
              <p className="price">
                {plan.price}
                <span> per month</span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href="/get-started" className="button">
          Get started today
        </Link>
      </section>
    </main>
  );
}
