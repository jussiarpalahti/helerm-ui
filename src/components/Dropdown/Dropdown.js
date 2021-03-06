import React from 'react';
import classnames from 'classnames';
import './Dropdown.scss';

export class Dropdown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick (index) {
    this.setState({ open: false });
    this.props.children[index].action();
  }

  generateRows (dropdownItems) {
    return dropdownItems.map((item, index) => {
      return (
        <button
          key={index}
          className={classnames('btn btn-sm dropdown-row', item.style)}
          onClick={() => this.handleClick(index)}>
          <span className={classnames('fa dropdown-icon', item.icon)}/>
          {item.text}
        </button>
      );
    });
  }

  render () {
    const { children, small, extraSmall } = this.props;
    const dropdownRows = this.generateRows(children);
    return (
      <span className='dropdown-wrapper' onBlur={() => setTimeout(() => this.setState({ open: false }), 180)}>
        <button
          className={classnames('btn btn-primary', { 'btn-sm': small }, { 'btn-xs': extraSmall })}
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <span className='fa fa-bars'/>
        </button>
        { this.state.open &&
        <div className={classnames('dropdown-items', { 'items-xs': extraSmall })}>
          {dropdownRows}
        </div>
        }
      </span>
    );
  }
}

Dropdown.propTypes = {
  children: React.PropTypes.array.isRequired,
  extraSmall: React.PropTypes.bool,
  small: React.PropTypes.bool
};

export default Dropdown;
