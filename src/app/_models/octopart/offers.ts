import { Prices } from "./prices";

export interface Offers {
  sku: string;
  moq: number;
  click_url : string;
  updated: Date;
  inventory_level: number;
  prices: Prices;
}
