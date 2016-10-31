import React from 'react';
import './ViewTOS.scss';
import formatDate from 'occasion';
import { StickyContainer, Sticky } from 'react-sticky';

export class ViewTOS extends React.Component {
  componentWillMount () {
    this.props.fetchRecordTypes();
  }

  formatDateTime (dateTime) {
    const date = dateTime.slice(0, 10);
    const time = dateTime.slice(11, 16);
    return { date, time };
  }

  generatePhases (phases) {
    const phaseElements = [];
    for (const key in phases) {
      if (phases.hasOwnProperty(key)) {
        const actions = phases[key].actions.map((action, index) => {
          const records = action.records.map((record, index) => {
            return (
              <tr key={index}>
                <td className='col-xs-8'>{record.name}</td>
                <td className='col-xs-4'>{this.props.recordTypes[record.type]}</td>
              </tr>
            );
          });
          return (
            <div key={index} className='action box'>
              <span className='action-title'>{action.name}</span>
              <table className='table table-striped table-hover records'>
                <thead>
                  <tr>
                    <th>Asiakirjatyypin tarkenne</th>
                    <th>Tyyppi</th>
                  </tr>
                </thead>
                <tbody>
                  {records}
                </tbody>
              </table>
            </div>
          );
        });
        phaseElements.push(
          <StickyContainer key={key} className='box'>
            <Sticky className='phase-title'>
              <i className='fa fa-info-circle' aria-hidden='true' /> {phases[key].name}
            </Sticky>
            <div className='space-between'>
              { phases[key].actions.length !== 0 &&
                <button type='button' onClick={() => this.props.togglePhaseVisibility(key, phases[key].is_open)}>
                  <span
                    className={'fa black-icon ' + (phases[key].is_open ? 'fa-minus' : 'fa-plus')}
                    aria-hidden='true'
                  />
                </button>
              }
            </div>
            { phases[key].is_open &&
              <div className={(phases[key].is_open ? 'show-actions' : 'hide-actions')}>
                { actions }
              </div>
            }
          </StickyContainer>
        );
      }
    }
    return phaseElements;
  }
  render () {
    const { selectedTOS, isFetching } = this.props;
    if (isFetching) {
      return (
        <div className='col-xs-12'>
          <div className='loader-container'>
            <h4>Ladataan tietoja</h4>
            <div className='loader' />
          </div>
        </div>
      );
    }
    if (selectedTOS !== undefined && Object.keys(selectedTOS).length !== 0) {
      const modifiedDateTime = this.formatDateTime(selectedTOS.modified_at);
      const formattedDate = formatDate(modifiedDateTime.date, 'DD.MM.YYYY');
      const phases = this.generatePhases(selectedTOS.phases);
      return (
        <div className='col-xs-12'>
          <StickyContainer className='single-tos-container'>
            <Sticky className='single-tos-header'>
              <h4>{selectedTOS.function_id} {selectedTOS.name}</h4>
            </Sticky>
            <div className="single-tos-content">
              <div className='general-info space-between'>
                <div className='version-details'>
                  <span>Tila: Luonnos versio 1.2</span>
                  <span>Käytössä oleva TOS-versio: 1.0</span>
                  <span>Muokattu: { formattedDate } { modifiedDateTime.time }</span>
                </div>
                <button className='btn btn-primary' onClick={() => this.props.setDocumentState('edit')}>Muokkaa</button>

                <div className='document-buttons'>
                  <button className='btn btn-primary'>Tallenna luonnos</button>
                  <button className='btn btn-default'>Lähetä tarkastettavaksi</button>
                </div>
              </div>
              <ul className='nav nav-tabs tos-nav'>
                <li className='active'>
                  <a href='#' data-toggle='tab'>Muokkausnäkymä</a>
                </li>
                <li>
                  <a href='#' data-toggle='tab'>Viestit & Versiot</a>
                </li>
              </ul>
              <div className='well'>
                <h4 className='unlocated-title'>Sijoittamattomat toimenpiteet ja asiakirjat</h4>
                <div className='box'>
                  <span>Neuvontapyynnöstä päättäminen</span>
                  <p>10 asiakirjaa | 3 liitettä</p>
                </div>
              </div>
              <div className='row'>
                <div className='button-row col-xs-12'>
                  <button
                    className='btn btn-default btn-sm pull-right'
                    onClick={() => this.props.setPhasesVisibility(selectedTOS.phases, true)}>
                    Avaa kaikki
                  </button>
                  <button
                    className='btn btn-default btn-sm pull-right'
                    onClick={() => this.props.setPhasesVisibility(selectedTOS.phases, false)}>
                    Pienennä kaikki
                  </button>
                </div>
              </div>
              { phases }
            </div>
          </StickyContainer>
        </div>
      );
    } else {
      return null;
    }
  }
}

ViewTOS.propTypes = {
  selectedTOS: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  togglePhaseVisibility: React.PropTypes.func.isRequired,
  setPhasesVisibility: React.PropTypes.func.isRequired,
  documentState: React.PropTypes.string.isRequired,
  setDocumentState: React.PropTypes.func.isRequired,
  fetchRecordTypes: React.PropTypes.func.isRequired,
  recordTypes: React.PropTypes.object.isRequired
};

export default ViewTOS;
