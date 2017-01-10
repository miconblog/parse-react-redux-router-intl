// react+redux+router
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { Router, IndexRoute, Route }    from 'react-router';
import { browserHistory }               from 'react-router';
import { syncHistoryWithStore  }        from 'react-router-redux';

// global
import moment from 'moment';
import lodash from 'lodash';
window.moment = moment;
window._ = lodash;

// for i18n
import { IntlProvider }        from 'react-intl';
import { translationMessages } from './i18n';
import enUS                    from 'antd/lib/locale-provider/en_US';
import LocaleProvider          from 'antd/lib/locale-provider';

// for PolyFill
import ES6Symbol      from 'es6-symbol';
import ObjectAssign   from 'object-assign';
if( !window.Symbol ){ window.Symbol = ES6Symbol }
if( !window.Object.assign ) { window.Object.assign = ObjectAssign }


// for configuration
import ReactGA        from 'react-ga';
import configureStore from './store/configureStore';
import { routes }     from './routes';
import Immutable      from 'immutable';


// for connect Redux <--> Histroy
const initialState = Immutable.Map();
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing');
  }
});

// 언어가 바뀌면 전체를 다시 랜더링한다
store.subscribe( () => {
  const locale  = store.getState().get('language').get('locale');

  if( locale !== window.locale ) {
    window.locale = locale;
    moment.locale(locale);
    renderAll(locale, translationMessages[locale]);
  }

});


function fireTracking() {
  const { location:{pathname} } = this.state;
  ReactGA.pageview(pathname);
}

function renderAll(locale, messages) {

  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <LocaleProvider locale={enUS} >
          <Router onUpdate={fireTracking} history={history} routes={routes} />
        </LocaleProvider>
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  );

}

// initial Login User from LocalStorage by Parse
import { initializeParseToRedux } from './libs/parseConnectRedux';
initializeParseToRedux(store);


//import Perf from 'react-addons-perf'
//Perf.start();
const initialLocale =  store.getState().get('language').get('locale');
const initialMessages = translationMessages[initialLocale];
window.locale = initialLocale;
moment.locale(initialLocale);
renderAll(initialLocale, initialMessages);
// setTimeout(()=>{
//   Perf.stop();
//   Perf.printWasted();
// }, 5000)


