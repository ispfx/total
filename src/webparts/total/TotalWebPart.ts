import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { Total, ITotalProps } from './components/Total';
import { Version } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDom from 'react-dom';

export interface ITotalWebPartProps {
  total: number;
}

export default class TotalWebPart extends BaseClientSideWebPart<ITotalWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ITotalProps> = React.createElement(Total, {
      total: this.properties.total,
    });
    ReactDom.render(element, this.domElement);
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
              groupName: 'Value',
              groupFields: [
                PropertyPaneSlider('total', {
                  label: 'Total Value',
                  min: 0,
                  max: 10000,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
