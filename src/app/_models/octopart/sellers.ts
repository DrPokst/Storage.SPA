import { Company } from "./company";
import { Offers } from "./offers";

export interface Sellers {
  company: Company;
  country: string;
  offers: Offers;
}
