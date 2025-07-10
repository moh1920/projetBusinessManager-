import {SousModule} from "./sousModule.model";

export interface Module {
  id: number;
  title?: string;
  sousModules: SousModule[];
}
