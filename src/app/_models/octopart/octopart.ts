
  export interface Manufacturer {
      name: string;
  }

  export interface BestDatasheet {
      name: string;
      url: string;
  }

  export interface Image {
      url: string;
  }

  export interface Attribute {
      name: string;
      group: string;
  }

  export interface Spec {
      attribute: Attribute;
      display_value: string;
  }

  export interface Company {
      name: string;
  }

  export interface Price {
      price: number;
      currency: string;
      quantity: number;
      converted_price: number;
      converted_currency: string;
  }

  export interface Offer {
      sku: string;
      moq?: number;
      click_url: string;
      updated: Date;
      inventory_level: number;
      prices: Price[];
  }

  export interface Seller {
      company: Company;
      offers: Offer[];
  }

  export interface Part {
      mpn: string;
      category?: any;
      manufacturer: Manufacturer;
      manufacturer_url?: any;
      best_datasheet: BestDatasheet;
      short_description: string;
      octopart_url: string;
      images: Image[];
      specs: Spec[];
      series?: any;
      sellers: Seller[];
  }

  export interface Result {
      part: Part;
  }

  export interface Search {
      results: Result[];
  }

  export interface Data {
      search: Search;
  }
