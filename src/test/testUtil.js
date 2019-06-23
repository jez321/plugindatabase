class TestUtil {
  static findByDataTestAttrVal(wrapper, val) {
    return wrapper.find(`[data-test="${val}"]`);
  }
}

export default TestUtil;
