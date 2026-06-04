const BASE_STYLE =
  'Contemporary corporate photography, realistic, sober and understated, natural directional lighting, high contrast, cinematic depth of field, muted palette with deep charcoal, graphite, matte black and warm neutral tones, industrial atmosphere, subtle grain. Avoid: deformed hands, holograms, blue neon, futuristic sci-fi clichés, cartoon, illustration, 3D render look, glowing circuit boards, over-saturated colors, text, watermarks, logos.';

export const imagePrompts = {
  hero_bg: {
    filename: 'hero_bg.png',
    size: '1792x1024',
    prompt: `Dark abstract texture evoking data and information flows, very subtle, almost monochrome. Soft horizontal currents of light over a matte dark surface, fine particulate detail, cinematic long exposure feel, minimal composition suitable as a background behind white text. Deep blacks, graphite grays, a single warm amber accent in the far distance. ${BASE_STYLE}`,
  },
  problem_section: {
    filename: 'problem_section.png',
    size: '1792x1024',
    prompt: `A focused professional working on a laptop in a sober, dimly lit modern office, looking thoughtfully at data on the screen. Shot from a three-quarter angle, shallow depth of field, face partially in shadow. Wooden desk, matte surfaces, a cup of coffee, papers. No visible screen content beyond abstract charts. Realistic skin tones, hands resting naturally on the keyboard (hands clearly visible and anatomically correct). ${BASE_STYLE}`,
  },
  solution_section: {
    filename: 'solution_section.png',
    size: '1792x1024',
    prompt: `Close-up of a clean, minimalist analytics dashboard on a high-quality monitor, with a pair of hands resting on a mechanical keyboard in the foreground. The dashboard shows simple abstract KPI tiles and a single line chart, neutral UI colors on dark background. Hands are realistic, correctly proportioned, well lit. Office environment softly blurred behind. ${BASE_STYLE}`,
  },
  usecase_whatsapp: {
    filename: 'usecase_whatsapp.png',
    size: '1024x1024',
    prompt: `Top-down overhead shot of a modern smartphone on a dark wooden desk, screen showing a generic business messaging conversation (abstract chat bubbles, no brand logos or readable text). Next to the phone: a leather notebook, a pen, a matte ceramic coffee cup. Warm side lighting, sober corporate mood. ${BASE_STYLE}`,
  },
  usecase_processes: {
    filename: 'usecase_processes.png',
    size: '1024x1024',
    prompt: `An abstract workflow diagram drawn on a dark glass board or displayed on a large dark screen in a quiet office: simple interconnected nodes and arrows, clean geometric shapes, no text labels. Soft ambient lighting, slightly out of focus reflections of the workspace. Minimalist, architectural feel. ${BASE_STYLE}`,
  },
  usecase_data: {
    filename: 'usecase_data.png',
    size: '1024x1024',
    prompt: `A professional workstation with multiple monitors displaying abstract graphs, tables and KPI charts, seen from behind or from the side. Dark professional environment, soft task lighting, no visible people. Screens emit a natural warm-neutral glow, not saturated blue. Realistic reflections and materials. ${BASE_STYLE}`,
  },
  usecase_reports: {
    filename: 'usecase_reports.png',
    size: '1024x1024',
    prompt: `A single large monitor on a tidy executive desk showing an abstract business report with KPI cards, a bar chart and a line chart, neutral UI palette on dark background. Corporate surroundings softly blurred: bookshelf, a plant, a framed piece of art in shadow. Elegant, restrained, realistic photography. ${BASE_STYLE}`,
  },
  about_section: {
    filename: 'about_section.png',
    size: '1792x1024',
    prompt: `A minimalist dark workspace, abstract and nearly empty: a long matte desk, a single pendant light casting a warm pool of illumination, a dark textured wall in the background. No people. Architectural, quiet, industrial but refined. Suitable as a wide background for an About section. ${BASE_STYLE}`,
  },

  cube_face_0: {
    filename: 'cube_face_0.png',
    size: '1024x1024',
    prompt: `Abstract graphic design: five horizontal bars of varying widths arranged vertically, like a KPI dashboard, on a very dark near-black background (#19171b). Bars are filled with warm gold (#d29f22), sizes 90%, 72%, 95%, 63%, 81% of width. A thin gold rectangular border frames the entire composition. Stark, minimal, brutalist graphic art. No text, no gradients, pure geometric shapes. Square format. High contrast.`,
  },
  cube_face_1: {
    filename: 'cube_face_1.png',
    size: '1024x1024',
    prompt: `Abstract network constellation: small gold dots connected by thin gold lines forming a geometric network diagram on an almost black background. Some dots are larger and brighter (nodes), connected to smaller satellite dots. Lines are very thin and slightly translucent. Gold (#d29f22) on near-black (#19171b). Minimal, cold, brutalist graphic style. No text. Square format.`,
  },
  cube_face_2: {
    filename: 'cube_face_2.png',
    size: '1024x1024',
    prompt: `Abstract workflow diagram: three stacked rectangular frames on a very dark background, labeled INPUT (top), KARDRA (center, with gold fill highlight), OUTPUT (bottom), connected by vertical arrows. Center frame glows very slightly gold. All borders in gold (#d29f22). Background #19171b. Brutalist, stark, minimal design. No decorative elements. Square format. High contrast.`,
  },
  cube_face_3: {
    filename: 'cube_face_3.png',
    size: '1024x1024',
    prompt: `Abstract circuit board close-up: thin gold traces run horizontally and vertically across a near-black background, meeting at gold circular nodes of varying sizes. The traces form an asymmetric grid-like pattern. Some nodes glow slightly. Color palette: near-black (#19171b) background, gold (#d29f22) traces and nodes. Macro detail, clean, flat design aesthetic. No text. Square format.`,
  },
  cube_face_4: {
    filename: 'cube_face_4.png',
    size: '1024x1024',
    prompt: `Abstract geometric diamond: concentric diamond shapes (rotated squares) drawn with thin gold lines on a very dark background, creating a nested optical illusion. A small solid gold diamond at the center. Faint diagonal striping pattern across the background at very low opacity. Color: near-black (#19171b), gold (#d29f22). Minimal, mathematical, brutalist. No text. Square format.`,
  },
  cube_face_5: {
    filename: 'cube_face_5.png',
    size: '1024x1024',
    prompt: `Abstract data table: six horizontal rows on a dark background, each row separated by a thin line. Each row shows a small gold square on the left and a varying-length dark bar in the center. One highlighted row (third) has a slightly lighter background and gold-colored elements. Clean, minimal, spreadsheet-like aesthetic. Color: near-black (#19171b), gold (#d29f22) accents. No text. Square format. Brutalist.`,
  },
};

export const imagePromptList = Object.entries(imagePrompts).map(([key, value]) => ({
  key,
  ...value,
}));

export default imagePrompts;
