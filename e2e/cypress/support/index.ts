// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your AOTP11 files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands.ts'

import type { AOTP11 } from '@AOTP11/core'

declare global {
  interface Window {
    AOTP11: AOTP11
  }
}
