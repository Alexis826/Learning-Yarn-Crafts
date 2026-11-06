import { CrochetHook, KnittingNeedles, StitchComparison } from "./Illustrations";

export const metadata = {
  title: "About | Cozy Loops",
};

const differences = [
  {
    topic: "Tools",
    knitting: "Two needles (or a circular needle)",
    crochet: "A single hook",
  },
  {
    topic: "Live stitches",
    knitting: "Many stitches are held on the needle at once",
    crochet: "Only one loop is active at a time",
  },
  {
    topic: "Fabric",
    knitting: "Smooth, stretchy and drapey",
    crochet: "Thicker, sturdier and more textured",
  },
  {
    topic: "Yarn use",
    knitting: "Uses less yarn for the same size piece",
    crochet: "Usually uses about a quarter to a third more yarn",
  },
  {
    topic: "Fixing mistakes",
    knitting: "Dropped stitches can run down the rows",
    crochet: "Easy to pull back to a mistake with one loop to catch",
  },
  {
    topic: "Shapes",
    knitting: "Great for flat, flowing garments",
    crochet: "Great for 3D shapes, motifs and lace",
  },
  {
    topic: "Machines",
    knitting: "Can be made by machine",
    crochet: "Real crochet can only be made by hand",
  },
];

export default function About() {
  return (
    <main className="about">
      <h1>About Knitting &amp; Crochet</h1>

      <section className="craft">
        <div className="craft-art">
          <CrochetHook />
        </div>
        <div className="craft-text">
          <h2>Crochet</h2>
          <h3>What it is</h3>
          <p>
            Crochet is a way of making fabric from yarn using a single hook.
            You pull loops of yarn through other loops, building the fabric one
            stitch at a time with only one loop on the hook. The name comes
            from the French word for &ldquo;hook.&rdquo; Crochet became popular
            in Europe in the 1800s, when Irish crochet lace was famous around
            the world.
          </p>
          <h3>Popular items</h3>
          <ul>
            <li>Granny square blankets and afghans</li>
            <li>Amigurumi (small stuffed toys and animals)</li>
            <li>Hats, beanies and scarves</li>
            <li>Shawls and lacy doilies</li>
            <li>Bags, baskets and coasters</li>
          </ul>
        </div>
      </section>

      <section className="craft">
        <div className="craft-art">
          <KnittingNeedles />
        </div>
        <div className="craft-text">
          <h2>Knitting</h2>
          <h3>What it is</h3>
          <p>
            Knitting makes fabric by forming rows of interlocking loops with two
            needles. A whole row of stitches sits on the needle, and you work
            each one onto the other needle using two basic stitches: knit and
            purl. Some of the oldest known knitted pieces are colorful socks
            from Egypt, made around a thousand years ago.
          </p>
          <h3>Popular items</h3>
          <ul>
            <li>Sweaters and cardigans</li>
            <li>Socks and mittens</li>
            <li>Scarves and hats</li>
            <li>Baby blankets</li>
            <li>Cowls and shawls</li>
          </ul>
        </div>
      </section>

      <section className="differences" aria-labelledby="differences-heading">
        <h2 id="differences-heading">Knitting vs. Crochet</h2>
        <div className="differences-art">
          <StitchComparison />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Knitting</th>
                <th scope="col">Crochet</th>
              </tr>
            </thead>
            <tbody>
              {differences.map((row) => (
                <tr key={row.topic}>
                  <th scope="row">{row.topic}</th>
                  <td>{row.knitting}</td>
                  <td>{row.crochet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
