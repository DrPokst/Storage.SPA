import { SpecResult } from "protractor/built/plugins";
import { Bdatasheet } from "./bdatasheet";
import { Name } from "./name";
import { Sellers } from "./sellers";
import { Specs } from "./specs";

export interface Part {
  mpn: string;
  manufacturer: Name;
  manufacturer_url: string;
  best_datasheet: Bdatasheet;
  specs: Specs;
  sellers: Sellers;
  octopart_url: string;
}
