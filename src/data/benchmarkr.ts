export type ProjectFact = {
  label: string;
  value: string;
};

export type WireframeScene =
  | "inspection-checkpoint"
  | "paper-vs-practice"
  | "separate-processes"
  | "step-builder"
  | "process-instance"
  | "visual-verification"
  | "needs-review"
  | "next-steps";

export type WireframeDevice = "tablet" | "desktop" | "paper" | "diagram";
export type WireframeRatio = "tablet" | "wide" | "landscape";
export type WireframeStatus = "current" | "planned";

export type VisualSpecification = {
  index: number;
  scene: WireframeScene;
  title: string;
  description: string;
  caption: string;
  device: WireframeDevice;
  ratio: WireframeRatio;
  status: WireframeStatus;
};

export const benchmarkrFacts: readonly ProjectFact[] = [
  { label: "Role", value: "Founder, lead product designer, and product builder" },
  { label: "Timeline", value: "2025–present" },
  { label: "Status", value: "Ongoing pilot program" },
  {
    label: "Collaborators",
    value: "Factory owner, lead shop-floor manager, and inspectors",
  },
  { label: "Languages", value: "English and Spanish" },
];

export const benchmarkrActivities = [
  "Stakeholder interviews",
  "Paper-process audit",
  "Shop-floor workflow mapping",
  "Product strategy",
  "Process-model redesign",
  "Interaction and UI design",
  "Bilingual product implementation",
  "SKU pilot",
] as const;

export const benchmarkrVisuals: readonly VisualSpecification[] = [
  {
    index: 1,
    scene: "inspection-checkpoint",
    title: "iPad inspection checkpoint",
    description:
      "One serialized fire table with process progress, its current inspection task, an approved reference, a captured-evidence thumbnail, and a Report an issue action.",
    caption:
      "The pilot puts approved standards and evidence capture beside the physical product, following one serialized fire table through its quality process.",
    device: "tablet",
    ratio: "tablet",
    status: "current",
  },
  {
    index: 2,
    scene: "paper-vs-practice",
    title: "Paper checklist versus practiced workflow",
    description:
      "A rigid ordered paper checklist beside an annotated real workflow with exceptions, overlapping roles, and informal workarounds.",
    caption:
      "The checklist made the workflow look linear. Conversations with the people applying it exposed exceptions, workarounds, and blurred boundaries between making and inspecting.",
    device: "paper",
    ratio: "landscape",
    status: "current",
  },
  {
    index: 3,
    scene: "separate-processes",
    title: "Original hard-typed process model",
    description:
      "Two separate desktop builder concepts—Manufacturing and Quality Control—with capabilities trapped at the process level.",
    caption:
      "My first model encoded the buyer’s language as two hard process types. Real workflows refused to stay in those boxes.",
    device: "desktop",
    ratio: "wide",
    status: "current",
  },
  {
    index: 4,
    scene: "step-builder",
    title: "One builder with step-level capabilities",
    description:
      "One desktop process-template builder with a step list; each selected Step independently configures inspection, supporting documents, imagery, and Tasks.",
    caption:
      "Moving behavior to the step level allowed the same builder to create manufacturing-only, inspection-only, or mixed workflows.",
    device: "desktop",
    ratio: "wide",
    status: "current",
  },
  {
    index: 5,
    scene: "process-instance",
    title: "One serialized product through its process instance",
    description:
      "iPad views of the same fire table’s serialized-product overview, current process Step, and progress history.",
    caption:
      "The pilot workflow follows one physical unit from its first checkpoint through the complete process instance.",
    device: "tablet",
    ratio: "wide",
    status: "current",
  },
  {
    index: 6,
    scene: "visual-verification",
    title: "The standard, the evidence, and human judgment",
    description:
      "An approved reference, a known-defect example, captured evidence, and the inspector’s human review decision shown together.",
    caption:
      "Benchmarkr places the expected result, known defects, and captured evidence together. The inspector—not the software—makes the quality judgment.",
    device: "tablet",
    ratio: "wide",
    status: "current",
  },
  {
    index: 7,
    scene: "needs-review",
    title: "Needs Review operational response",
    description:
      "A Needs Review queue with process filtering, product rows, step-level issue context, and a detail panel with Clear review, Send back, and Reject actions.",
    caption:
      "Leadership can filter the live queue by process, inspect step-level context, and decide whether a unit should continue, be reworked, or be rejected.",
    device: "desktop",
    ratio: "wide",
    status: "current",
  },
  {
    index: 8,
    scene: "next-steps",
    title: "Touch-free completion and aggregate learning",
    description:
      "A stationary barcode scanner used by a gloved fabricator beside a future aggregate analytics view ranking Steps by issue volume and trend.",
    caption:
      "Planned after the pilot: touch-free barcode completion for fabricators, followed by aggregate analytics once broader usage produces enough data to reveal recurring process issues.",
    device: "diagram",
    ratio: "wide",
    status: "planned",
  },
];

export const pilotMeasures = [
  "Whether defects are identified before additional labor, material, or shipping.",
  "Time from an inspector reporting an issue to a manager’s decision.",
  "Whether leadership can identify the process steps associated with recurring issues across the facility.",
] as const;

export const benchmarkrNextSteps = [
  "Barcode-based completion at a physical workstation so a gloved fabricator can record completion without navigating a touchscreen.",
  "Aggregate analytics after broader rollout, once enough data exists to show issue counts and trends by process and Step.",
] as const;
