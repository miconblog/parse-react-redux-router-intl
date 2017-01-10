export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const DEFAULT_LOCALE = 'ko';

export function changeLanguage(localeCode) {

  return (dispatch, getState) => {

    return dispatch({
      type: CHANGE_LOCALE,
      locale: localeCode
    });
  }
}
