import checkPropTypes from 'check-prop-types';
import { mockMediaQueryList } from 'use-media';

class TestUtil {
  static findByDataTestAttrVal(wrapper, val) {
    return wrapper.find(`[data-test="${val}"]`);
  }

  static getMockImplementation({ media, matches = false }) {
    const mql = {
      ...mockMediaQueryList,
      media,
      matches,
    };

    return () => mql;
  }

  static mockMatchMedia({ media, matches = false }) {
    const mockedImplementation = TestUtil.getMockImplementation({ media, matches });
    window.matchMedia = jest.fn().mockImplementation(mockedImplementation);
  }

  static checkProps(component, props) {
    const propError = checkPropTypes(
      component.propTypes,
      props,
      'prop',
      component.name,
    );
    expect(propError).toBeUndefined();
  }
}

export default TestUtil;
