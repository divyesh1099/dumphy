import { Component, Input } from "@angular/core";
import { PropertyBase } from "src/app/model/IPropertyBase";

@Component({
  selector: 'app-property-card',
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.scss']
  })
export class PropertyCardComponent {
  @Input()
  property!: PropertyBase;

  @Input()
  hideIcons?: boolean;
}
