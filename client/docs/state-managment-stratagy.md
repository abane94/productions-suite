# State Management Strategy

The current strategy is somewhat influenced by my **brief** experience with ember.js and flutter.

The idea being:

## Pages
A page needs to be identified as such, it is a single component that is only used as a page. It will have its own service that will all and only business data and business logic.

## Business Data (Data Holders)
Business data will be held in state services (valueStateService & ListStateService) these services are somewhat inspired by models/records. They hold the data, an in the list variation, hold the context for the list (filters, sorting, and paging).

Data services should be communicated with exclusively from these state services.

## Data Services
Data services are a collective term for the two classes that implement IGenericData. Which would be GenericDataService (stateless) and GenericDataStore (stateful). Stateful, here meaning cache. GenericDataStore can be used for data collections that are not expect ot change as ofter (Materials, products,...) and GenericDataService for collection that change more ofter (Orders, Quotes, ...)


## Providers
Several of the points expressed here will be accomplished and enforced using the various ways that Angular services can be provided.

Namely a page should be responsible for directly specifying the providers it will use, its own State service, and the data holding services that the state will use. And a page will need to use multiple instances of the same Data holder, in this instance, the providers should be named.

If a widget (components that are not pages) should require access to a state, in a way that cannot be passed down from the page. Having the providers listed in the page, will not only block singletons, but have children down the component chain receive the same services that the parents use, and can inject the correct instance with names


```typescript
@Injectable()
class MaterialListPageState {
  constructor(
    public materials: ListStateService<Material>,  // Data holder Service, this pages data
    materialService: MaterialService
  ) {
    materials.setData(materialService);  // Setting the data service until a better option is determined
  }
}

@Component({
  selector: 'app-materials-list-page',
  templateUrl: './materials-list-page.component.html',
  styleUrls: ['./materials-list-page.component.scss'],
  providers: [ MaterialListPageState, MaterialService ]  // specifically provide the page's state and the service the state will use
})
export class MaterialsListPageComponent implements OnInit {

```


## Going forward...

The Data holding services are currently generic, this means that they can not correctly inject their own data services, so the page must inject them and then set them using a method. If the data holders were instead several implementations of this generic service (per model), this would remove some of the boilerplate, in exchange for more classes/services. Something to consider...

While writing this it seems like I may have overloaded the terms state service, data holding services and page state services, so a few name changes might be in order...
