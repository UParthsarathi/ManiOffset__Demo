// Calculator on/off switch. On unless NEXT_PUBLIC_CALCULATOR_ENABLED=false at build time.
// next.config.mjs reads the same env var to redirect the calculator routes when off.
export const CALCULATOR_ENABLED = process.env.NEXT_PUBLIC_CALCULATOR_ENABLED !== 'false';
