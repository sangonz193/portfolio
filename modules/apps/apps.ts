import { Application } from "./app"
import { dataLoomApp } from "./data-loom/app"
import { meApp } from "./me/app"
import { openfingApp } from "./openfing/app"
import { spendSplitterApp } from "./spend-splitter/app"

export const applications: Application[] = [
  meApp,
  dataLoomApp,
  openfingApp,
  spendSplitterApp,
]
