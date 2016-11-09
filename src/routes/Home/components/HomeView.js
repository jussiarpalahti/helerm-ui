import React from 'react';
import Navigation from './Navigation';
import Loader from './Loader';
import ViewTOS from './ViewTOS';
import './Homeview.scss';

export class HomeView extends React.Component {
  render () {
    const {
      fetchNavigation,
      setNavigationVisibility,
      navigation,
      fetchTOS,
      selectedTOS,
      selectedTOSPath,
      setPhaseVisibility,
      isFetching,
      setPhasesVisibility,
      documentState,
      setDocumentState,
      fetchRecordTypes,
      recordTypes,
      fetchAttributes,
      attributes,
      addAction,
      addRecord
    } = this.props;
    return (
      <div>
        { isFetching &&
          <Loader
            isFetching={isFetching}
          />
        }
        <Navigation
          fetchTOS={fetchTOS}
          fetchNavigation={fetchNavigation}
          navigation={navigation}
          setNavigationVisibility={setNavigationVisibility}
          selectedTOSPath={selectedTOSPath}
        />
        <ViewTOS
          selectedTOS={selectedTOS}
          setPhaseVisibility={setPhaseVisibility}
          isFetching={isFetching}
          setPhasesVisibility={setPhasesVisibility}
          documentState={documentState}
          setDocumentState={setDocumentState}
          fetchRecordTypes={fetchRecordTypes}
          recordTypes={recordTypes}
          fetchAttributes={fetchAttributes}
          attributes={attributes}
          addAction={addAction}
          addRecord={addRecord}
        />
      </div>
    );
  }
};
HomeView.propTypes = {
  fetchTOS: React.PropTypes.func.isRequired,
  fetchNavigation: React.PropTypes.func.isRequired,
  navigation: React.PropTypes.object.isRequired,
  setNavigationVisibility: React.PropTypes.func.isRequired,
  selectedTOS: React.PropTypes.object.isRequired,
  selectedTOSPath: React.PropTypes.array.isRequired,
  setPhaseVisibility: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  setPhasesVisibility: React.PropTypes.func.isRequired,
  documentState: React.PropTypes.string.isRequired,
  setDocumentState: React.PropTypes.func.isRequired,
  fetchRecordTypes: React.PropTypes.func.isRequired,
  recordTypes: React.PropTypes.object.isRequired,
  fetchAttributes: React.PropTypes.func.isRequired,
  attributes: React.PropTypes.object.isRequired,
  addAction: React.PropTypes.func.isRequired,
  addRecord: React.PropTypes.func.isRequired
};
export default HomeView;
