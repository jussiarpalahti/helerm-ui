import { createAction } from 'redux-actions';
import { fetchTOS, default as tosReducer } from 'components/Tos/reducer';
import _ from 'lodash';

describe('(Redux Module) Tos', () => {
  describe('(Reducer) TOSReducer', () => {
    let _initialState;
    beforeEach(() => {
      _initialState = {
        id: null,
        function_id: null,
        parent: null,
        version: null,
        name: null,
        error_count: null,
        state: null,
        created_at: null,
        modified_at: null,
        modified_by: null,
        actions: {},
        phases: {},
        records: {},
        attributes: {},
        documentState: 'view',
        lastUpdated: 0,
        isFetching: false
      };
    });
    it('Should be a function.', () => {
      expect(tosReducer).to.be.a('function');
    });

    it('Should initialize with a correct state', () => {
      expect(tosReducer(undefined, {})).to.deep.equal(_initialState);
    });

    it('Should return the previous state if an action was not matched.', () => {
      let state = tosReducer(undefined, {});
      expect(state).to.deep.equal(_initialState);
      state = tosReducer(state, {
        type: 'DOESNOTACTUALLYEXISTLOL'
      });
      expect(state).to.deep.equal(_initialState);
      state = tosReducer(state, createAction('requestTosAction')());
      expect(state.isFetching).to.equal(true);
      state = tosReducer(state, {
        type: 'DOESNOTACTUALLYEXISTLOL'
      });
      expect(state.isFetching).to.equal(true);
    });
  });

  describe('(Action Creator) fetchTOS', () => {
    let _dispatchSpy;
    let _globalState;

    beforeEach(() => {
      _globalState = {
        selectedTOS: tosReducer(undefined, {})
      };
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          selectedTOS: tosReducer(_globalState.selectedTOS, action)
        };
      });
    });

    it('Should fetch Tos', () => {
      expect(_.keys(_globalState.selectedTOS.tos).length).to.equal(0);
      expect(_.keys(_globalState.selectedTOS.phases).length).to.equal(0);
      expect(_.keys(_globalState.selectedTOS.actions).length).to.equal(0);
      expect(_.keys(_globalState.selectedTOS.records).length).to.equal(0);
      expect(_.keys(_globalState.selectedTOS.attributes).length).to.equal(0);
      return setTimeout(fetchTOS('8fb03366f89e422c9ca1503b78a98530')(_dispatchSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice;
          expect(_.keys(_globalState.selectedTOS.tos).length).to.be.greaterThan(0);
          expect(_.keys(_globalState.selectedTOS.phases).length).to.be.greaterThan(0);
          expect(_.keys(_globalState.selectedTOS.actions).length).to.be.greaterThan(0);
          expect(_.keys(_globalState.selectedTOS.records).length).to.be.greaterThan(0);
        }), 15000);
    });
  });
});
