import React from 'react';
import classnames from 'classnames';
import includes from 'lodash/includes';
import capitalize from 'lodash/capitalize';
import Attribute from './Attribute';

export const Attributes = ({
  attributeTypes,
  element,
  documentState,
  renderBasicAttributes,
  renderButtons,
  showAttributes,
  type,
  typeOptions,
  updateAttribute,
  updateTypeSpecifier,
  updateType
}) => {
  function generateDescriptions (element) {
    const descriptions = [];
    let elementType;

    switch (type) {
      case 'phase':
        elementType = 'Käsittelyvaiheen tyyppi';
        break;
      case 'action':
        elementType = 'Toimenpiteen tyyppi';
        break;
      case 'record':
        elementType = 'Asiakirjan tyyppi';
        break;
    }

    descriptions.push({
      descriptionKey: `${elementType} tarkenne`,
      typeSpecifier: element.attributes[`${capitalize(type)}Type`],
      type: element.attributes[`${capitalize(type)}Type`]
    });
    descriptions.push({
      descriptionKey: 'Tarkenne',
      typeSpecifier: element.attributes.TypeSpecifier,
      type: ''
    });

    return descriptions;
  }

  function generateBasicAttributes (descriptions) {
    return descriptions.map((description, index) => {
      return (
        <Attribute
          key={index}
          elementId={element.id}
          attributeIndex={description.type}
          attributeKey=''
          attribute={description.typeSpecifier}
          documentState={documentState}
          typeOptions={typeOptions}
          type={'basic'}
          parentType={type}
          editable={true}
          updateTypeSpecifier={updateTypeSpecifier}
          updateType={updateType}
          updateAttribute={updateAttribute}
          showAttributes={true}
        />
      );
    });
  }

  function generateAttributes (attributes) {
    const attributeElements = [];
    const unwantedAttributes = ['TypeSpecifier', 'RecordType', 'ActionType', 'PhaseType'];

    for (const key in attributeTypes) {
      if (attributes.hasOwnProperty(key) && attributes[key] && attributeTypes[key] && !includes(unwantedAttributes, key)) {
        attributeElements.push(
          <Attribute
            key={key}
            elementId={element.id}
            attributeIndex={key}
            attributeKey={attributeTypes[key].name}
            attribute={attributes[key]}
            attributeTypes={attributeTypes}
            documentState={documentState}
            type={'attribute'}
            parentType={type}
            editable={true}
            updateAttribute={updateAttribute}
            showAttributes={showAttributes}
          />);
      }
    }

    return attributeElements;
  }

  const buttons = renderButtons ? renderButtons() : null;
  const basicAttributes = renderBasicAttributes
    ? renderBasicAttributes()
    : generateBasicAttributes(generateDescriptions(element));
  const attributes = generateAttributes(element.attributes);

  return (
    <div className={classnames('list-group', `${type}-attributes`)}>
      { basicAttributes }
      { buttons }
      { attributes }
    </div>
  );
};

Attributes.propTypes = {
  attributeTypes: React.PropTypes.object.isRequired,
  documentState: React.PropTypes.string.isRequired,
  element: React.PropTypes.object.isRequired,
  renderBasicAttributes: React.PropTypes.func,
  renderButtons: React.PropTypes.func,
  showAttributes: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  typeOptions: React.PropTypes.object,
  updateAttribute: React.PropTypes.func,
  updateType: React.PropTypes.func,
  updateTypeSpecifier: React.PropTypes.func
};

export default Attributes;
