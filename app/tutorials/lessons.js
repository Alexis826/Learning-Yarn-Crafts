// Step pictures for each lesson live in stepDiagrams.js, keyed by lesson id.

export const crochetLessons = [
  {
    id: "crochet-getting-started",
    title: "Getting Started: Holding the Hook and Making a Slip Knot",
    summary:
      "Every crochet project begins with a slip knot on your hook. Get comfortable holding the hook and yarn first.",
    steps: [
      "Hold the hook in your dominant hand, either like a pencil (between thumb and index finger) or like a knife (hand over the top). Use whichever feels natural.",
      "Drape the yarn coming from the ball (the working yarn) over the index finger of your other hand. Loosely weave it between your fingers to control the tension.",
      "To make a slip knot, leave a 6-inch tail and make a loop by crossing the tail over the working yarn.",
      "Reach through the loop, grab the working yarn, and pull it through to form a new loop.",
      "Slide the new loop onto your hook and gently pull both yarn ends to snug it up. It should slide easily on the hook, not be tight.",
      "Pinch the base of the knot with the thumb and middle finger of your yarn hand to keep it steady while you work.",
    ],
  },
  {
    id: "crochet-chain",
    title: "Chain Stitch (ch)",
    summary:
      "The chain is the foundation row for most crochet projects. Every other stitch is worked into it.",
    steps: [
      "Start with a slip knot on your hook.",
      "Yarn over: wrap the working yarn over the hook from back to front.",
      "Catch the yarn in the hook's throat and pull it through the loop on your hook. That's one chain.",
      "Repeat until you have the number of chains your pattern asks for.",
      "Keep chains loose and even. Move your pinching fingers up every few stitches.",
      "To count, look for the little V shapes. Don't count the slip knot or the loop that's on your hook.",
    ],
  },
  {
    id: "crochet-slip-stitch",
    title: "Slip Stitch (sl st)",
    summary:
      "The shortest stitch. It's used to join rounds, move across a row, and finish edges.",
    steps: [
      "Insert your hook into the next stitch (or chain).",
      "Yarn over.",
      "Pull the yarn through the stitch and through the loop on your hook in one motion.",
      "You'll have one loop left on your hook. That's one slip stitch.",
      "To join a ring of chains into a circle, slip stitch into the first chain you made.",
    ],
  },
  {
    id: "crochet-single",
    title: "Single Crochet (sc)",
    summary:
      "A short, tight stitch that makes a sturdy fabric. Great for amigurumi, coasters, and dishcloths.",
    steps: [
      "Make a chain. Insert your hook into the 2nd chain from the hook.",
      "Yarn over and pull up a loop. You now have 2 loops on your hook.",
      "Yarn over again and pull through both loops. One single crochet is done.",
      "Work one single crochet into each chain across.",
      "At the end of the row, chain 1 (the turning chain) and turn your work.",
      "On the next row, insert your hook under both loops at the top of each stitch and repeat.",
    ],
  },
  {
    id: "crochet-half-double",
    title: "Half Double Crochet (hdc)",
    summary:
      "A medium-height stitch that works up quickly. Popular for hats and blankets.",
    steps: [
      "Make a chain. Yarn over, then insert your hook into the 3rd chain from the hook.",
      "Yarn over and pull up a loop. You now have 3 loops on your hook.",
      "Yarn over and pull through all 3 loops at once. One half double crochet is done.",
      "Repeat across the row, starting each stitch with a yarn over.",
      "At the end of the row, chain 2 and turn.",
    ],
  },
  {
    id: "crochet-double",
    title: "Double Crochet (dc)",
    summary:
      "A tall stitch that makes a soft, drapey fabric. It's the base of the classic granny square.",
    steps: [
      "Make a chain. Yarn over, then insert your hook into the 4th chain from the hook.",
      "Yarn over and pull up a loop. You now have 3 loops on your hook.",
      "Yarn over and pull through the first 2 loops. You now have 2 loops.",
      "Yarn over and pull through the last 2 loops. One double crochet is done.",
      "Repeat across the row, starting each stitch with a yarn over.",
      "At the end of the row, chain 3 and turn. In most patterns, this chain 3 counts as the first double crochet of the next row.",
    ],
  },
  {
    id: "crochet-fasten-off",
    title: "Fastening Off and Weaving In Ends",
    summary: "Finish your project so it won't unravel.",
    steps: [
      "After your last stitch, cut the yarn, leaving a tail of about 6 inches.",
      "Yarn over with the tail and pull it all the way through the loop on your hook. Tug gently to close the knot.",
      "Thread the tail onto a yarn needle (a large, blunt needle).",
      "Weave the tail in and out through the back of your stitches for a few inches, then change direction and weave back a little to lock it in place.",
      "Trim the leftover yarn close to the fabric.",
    ],
  },
];

export const knittingLessons = [
  {
    id: "knitting-getting-started",
    title: "Getting Started: Holding the Needles and Making a Slip Knot",
    summary:
      "Every knitting project starts with a slip knot on one needle. Get comfortable holding your needles and yarn first.",
    steps: [
      "Pick medium-sized needles (US 8, or 5 mm) and a smooth, light-colored worsted-weight yarn. It's easier to see your stitches.",
      "Leave a long tail and make a loop by crossing the tail over the working yarn (the yarn coming from the ball).",
      "Reach through the loop, grab the working yarn, and pull it through to form a new loop.",
      "Slide the loop onto one needle and gently pull both ends to snug it up. This slip knot counts as your first stitch.",
      "Hold the needle with stitches in your left hand and the empty needle in your right hand.",
      "Drape the working yarn over your right index finger (English style) or left index finger (continental style). Either way works.",
    ],
  },
  {
    id: "knitting-cast-on",
    title: "Casting On (Long-Tail Cast On)",
    summary:
      "Casting on puts your first row of stitches on the needle. The long-tail cast on is neat, stretchy, and a great all-purpose choice.",
    steps: [
      "Leave a tail about 1 inch long for every stitch you plan to cast on, plus a few extra inches. Make a slip knot there and put it on your right needle.",
      "Hold the needle in your right hand. With your left hand, put the tail over your thumb and the working yarn over your index finger. Hold both strands in your palm, making a slingshot shape.",
      "Bring the needle tip up through the loop on your thumb, from front to back.",
      "Reach the needle over and around the yarn on your index finger, catching it.",
      "Bring the needle back down through the thumb loop.",
      "Drop the loop off your thumb and gently pull the tail to snug the new stitch on the needle.",
      "Repeat until you have the number of stitches your pattern calls for.",
    ],
  },
  {
    id: "knitting-knit",
    title: "Knit Stitch (k)",
    summary:
      "The most important stitch in knitting. Knitting every row makes a squishy, ridged fabric called garter stitch.",
    steps: [
      "Hold the needle with your stitches in your left hand. Keep the working yarn at the back of your work.",
      "Insert the right needle into the front of the first stitch, from left to right, so the right needle sits behind the left needle.",
      "Wrap the working yarn around the right needle counterclockwise, from back to front, between the two needles.",
      "Use the right needle to pull the new loop down and through the stitch, toward you.",
      "Slide the old stitch off the left needle. The new stitch stays on the right needle.",
      "Repeat until all stitches have moved to the right needle. Then swap needles and start the next row.",
    ],
  },
  {
    id: "knitting-purl",
    title: "Purl Stitch (p)",
    summary:
      "The purl is the knit stitch done in reverse. Alternating a knit row and a purl row makes smooth stockinette fabric.",
    steps: [
      "Hold the needle with your stitches in your left hand. Bring the working yarn to the front of your work.",
      "Insert the right needle into the front of the first stitch, from right to left, so the right needle sits in front of the left needle.",
      "Wrap the working yarn around the right needle counterclockwise, from front to back.",
      "Push the right needle back through the stitch, taking the new loop with it.",
      "Slide the old stitch off the left needle.",
      "Repeat across the row. For stockinette, knit one row, purl the next, and keep alternating.",
    ],
  },
  {
    id: "knitting-bind-off",
    title: "Binding Off and Weaving In Ends",
    summary:
      "Binding off takes stitches off the needle without them unraveling, finishing your edge.",
    steps: [
      "Knit the first two stitches of the row.",
      "Insert the left needle into the first stitch you knitted (the one farther from the tip) on the right needle.",
      "Lift that stitch over the second stitch and off the needle. One stitch is bound off.",
      "Knit one more stitch, then lift the previous stitch over it and off. Repeat until one stitch is left.",
      "Cut the yarn, leaving a 6-inch tail. Pull the tail through the last stitch and tug to close it.",
      "Thread the tail onto a yarn needle and weave it through the back of your stitches for a few inches. Trim the extra.",
      "Keep your bind off loose so the edge stretches as much as the rest of your fabric.",
    ],
  },
];
