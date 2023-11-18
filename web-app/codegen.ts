import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  //TODO: Make this configurable using .env file
  schema: "schema.graphql",
  documents: ["src/graphql/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
