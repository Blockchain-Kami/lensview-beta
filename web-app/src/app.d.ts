// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      hint: string;
    }
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

declare global {
  interface Window {
    ethereum: any;
  }
}

export {};
