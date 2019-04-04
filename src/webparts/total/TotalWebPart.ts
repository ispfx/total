import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneSlider, IPropertyPaneConditionalGroup, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField } from '@microsoft/sp-property-pane';
import { Total, ITotalProps } from './components/Total';
import { Version } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DynamicProperty } from '@microsoft/sp-component-base';

export interface ITotalWebPartProps {
  total: DynamicProperty<number>;
}

export default class TotalWebPart extends BaseClientSideWebPart<ITotalWebPartProps> {
  public render(): void {
    // Get dynamic props
    const total: number | undefined = this.properties.total.tryGetValue();

    const element: React.ReactElement<ITotalProps> = React.createElement(Total, {
      total,
    });
    ReactDom.render(element, this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      total: {
        dynamicPropertyType: 'number',
      },
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Total Settings'
          },
          groups: [
            {
              primaryGroup: {
                groupName: 'Value',
                groupFields: [
                  PropertyPaneSlider('total', {
                    label: 'Total Value',
                    min: 0,
                    max: 10000,
                  }),
                ]
              },
              secondaryGroup: {
                groupName: 'Value',
                groupFields: [
                  PropertyPaneDynamicFieldSet({
                    label: 'Total',
                    fields: [
                      PropertyPaneDynamicField('total', {
                        label: 'Total Value',
                      }),
                    ]
                  })
                ]
              },
              showSecondaryGroup: !!this.properties.total.tryGetSource(),
            } as IPropertyPaneConditionalGroup
          ]
        }
      ]
    };
  }
}
