import React, { Component } from 'react';
import SideBar from 'react-sidebar';
import map from 'lodash/map';
import filter from 'lodash/filter';
import './ValidationBar.scss';

import {
  validateTOS,
  validatePhase,
  validateAction,
  validateRecord
} from '../../../utils/validators';

const styles = {
  sidebar: {
    width: 300,
    height: '100%',
    padding: '10px 0 0 20px',
    backgroundColor: 'white',
    zIndex: '99'
  },
  sidebarLink: {
    display: 'block',
    color: '#757575',
    textDecoration: 'none'
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575'
  },
  content: {
    height: '100%'
  }
};

export class ValidationBar extends Component {
  constructor (props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  generateInvalidAttributes (validate, values) {
    const invalidAttributes = validate(values, this.props.attributeTypes);
    const mappedInvalidAttributes = map(invalidAttributes, (item, index) => (
      <div key={index} className='missing-attribute'>
        {'• '}{this.props.attributeTypes[item].name}
      </div>
    ));

    if (invalidAttributes.length) {
      return (
        <div className='missing-attributes'>
          {mappedInvalidAttributes}
        </div>
      );
    }
  }

  generateAttributeSection (validate, elements) {
    const { attributeTypes } = this.props;
    const mappedAttributeSections = map(elements, (element, index) => {
      const invalidAttributes = validate(element, attributeTypes);
      if (invalidAttributes.length) {
        return (
          <div key={index}>
            <div className='parent-name'>{element.name}</div>
            <div className='missing-attributes'>
              {map(invalidAttributes, (item, key) => {
                return (
                  <div key={key} className='missing-attribute'>
                    {'•'} {attributeTypes[item].name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    });

    return filter(mappedAttributeSections, (section) => (section !== undefined));
  }

  renderContent () {
    const { selectedTOS } = this.props;

    const invalidTOSAttributes = this.generateInvalidAttributes(validateTOS, selectedTOS);
    const invalidPhaseAttributes = this.generateAttributeSection(validatePhase, selectedTOS.phases);
    const invalidActionAttributes = this.generateAttributeSection(validateAction, selectedTOS.actions);
    const invalidRecordAttributes = this.generateAttributeSection(validateRecord, selectedTOS.records);

    if (invalidTOSAttributes ||
        invalidPhaseAttributes.length > 0 ||
        invalidActionAttributes.length > 0 ||
        invalidRecordAttributes.length > 0) {
      return (
        <div className='sidebar-content'>
          <h4>Puuttuvat metatiedot</h4>
          {invalidTOSAttributes &&
            <h5>Asian metatiedot</h5>}
          {invalidTOSAttributes}
          {invalidPhaseAttributes.length > 0 &&
            <h5>Käsittelyvaiheet</h5>}
          {invalidPhaseAttributes}
          {invalidActionAttributes.length > 0 &&
            <h5>Toimenpiteet</h5>}
          {invalidActionAttributes}
          {invalidRecordAttributes.length > 0 &&
            <h5>Asiakirjat</h5>}
          {invalidRecordAttributes}
        </div>
      );
    }
    return (
      <div className='sidebar-content'>
        <div className='no-missing-attributes fa fa-check-circle'/>
      </div>
    );
  }

  render () {
    const { children, selectedTOS } = this.props;
    const sidebarContent = selectedTOS.id ? this.renderContent() : <div/>;

    return (
      <div>
        <SideBar
          sidebar={sidebarContent}
          open={this.props.is_open}
          onSetOpen={() => this.props.setValidationVisibility(false)}
          pullRight={true}
          styles={styles}>
          {children}
        </SideBar>
      </div>
    );
  }
};

ValidationBar.propTypes = {
  attributeTypes: React.PropTypes.object.isRequired,
  children: React.PropTypes.array.isRequired,
  is_open: React.PropTypes.bool.isRequired,
  selectedTOS: React.PropTypes.object.isRequired,
  setValidationVisibility: React.PropTypes.func.isRequired
};

export default ValidationBar;
