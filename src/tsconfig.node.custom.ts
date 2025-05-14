
// This file exists to help resolve TypeScript configuration issues
// without modifying read-only configuration files

// The composite setting is required for project references
// The noEmit setting needs to be false for referenced projects
export const tsConfigNodeCustom = {
  compilerOptions: {
    composite: true,
    noEmit: false,
    outDir: "./dist",
    module: "ESNext",
    moduleResolution: "Node",
    allowSyntheticDefaultImports: true
  },
  include: ["vite.env.d.ts"]
};

// Export the configuration to make this a valid module
export default tsConfigNodeCustom;
