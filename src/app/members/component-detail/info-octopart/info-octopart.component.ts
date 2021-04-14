import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import Observable from 'zen-observable';
import { variable } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';
import { Octopart } from 'src/app/_models/octopart/octopart';
import { Components } from 'src/app/_models/components';
import { Part } from 'src/app/_models/octopart/part';
import { Results } from 'src/app/_models/octopart/results';

const GET_INFO = gql`
query MyPartSearch($q: String!, $limit: Int!, $currency: String!) {
  search(q: $q, limit: $limit,  currency: $currency) {
    results {
      part {
        mpn
        manufacturer {
          name
        }
        manufacturer_url
        best_datasheet {
          name
          url
          credit_string
          credit_url
          page_count
          mime_type
        }
        specs {
          attribute {
            name
            group
          }
          display_value
        }
        sellers(include_brokers: false, authorized_only: true) {
          company {
            name
          }
          country
          offers {
            sku
            moq
            click_url
            updated
            inventory_level
            prices {
              price
              currency
              quantity
              converted_price
              converted_currency
            }
          }
        }
        octopart_url
      }
    }
  }
}
`;

@Component({
  selector: 'app-info-octopart',
  templateUrl: './info-octopart.component.html',
  styleUrls: ['./info-octopart.component.css']
})

export class InfoOctopartComponent implements OnInit {
  info: Octopart;
  loading: boolean;
  part: Results;
  @Input() components: Components;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.get_info(this.components.mnf, 1, "USD");
  }


  get_info(mnf: string, set: number, currency: string){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_INFO,
      variables: {
        q: mnf,
        limit: set,
        currency: currency
      }
    }).valueChanges
    .subscribe(({ data, loading }) => {
      this.info = data;
      this.loading = loading;
    });


  }
}
