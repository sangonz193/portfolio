import { Application } from "./app"
import { dataLoomApp } from "./data-loom/app"
import { openfingApp } from "./openfing/app"
import { spendSplitterApp } from "./spend-splitter/app"

export const applications: Application[] = [
  dataLoomApp,
  openfingApp,
  spendSplitterApp,
]
