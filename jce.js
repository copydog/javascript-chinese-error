((global) => {
  const typeDict = {
    Error: '错误',
    EvalError: 'Eval错误',
    TypeError: '变量类型错误',
    RangeError: '范围错误',
    ReferenceError: '引用错误',
    SyntaxError: '语法错误',
    URIError: 'URI错误',
    InternalError: '内部错误',
  };

  const descriptionDict = {
    'Maximum call stack size exceeded': '超出最大调用堆栈大小'
  };

  const reasonDict = {
    'Maximum call stack size exceeded': '多半是递归函数出现逻辑错误, 导致无限递归'
  };

  /**
   * Translate error name from message
   *
   * @param message
   * @returns {string}
   */
  const translateErrorName = (message) => {
    const errorName = message
      .split(':')[0]
      .replace('Uncaught ', '');

    return errorName
      .split(' ')
      .map(item => {
        return typeDict[item] || item.replace('Error', '错误')
      })
      .join(' ')
  };

  const translateErrorDescription = (message) => {
    const errorDescription = message.split(':')[1];
    return descriptionDict[errorDescription] || errorDescription
  };

  const translatePossibleReason = (message) => {
    const errorDescription = message.split(':')[1];
    return reasonDict[errorDescription] || '抱歉, 没有相关解释记载'
  }


  const createErrorMessage = (name, description, url, line, possibleReason = '') => {
    const encodedDescription = description.trim().replace(/\s/g, '%20')
    return `错误: ${name}`
      + `\n\t错误具体描述: ${description}`
      + `\n\t错误可能原因: ${possibleReason}`
      + `\n\t错误所在文件: ${url}:${line}`
      + `\n\t错误所在行数: ${line}`
      + `\n\t----- 解决方案 -----`
      + `\n\tCSDN解决方案: https://so.csdn.net/so/search/s.do?q=${encodedDescription}&t=%20&u=`;
  };

  // Waiting for errors
  global.onerror = function (message, url, line) {
    const errorName = translateErrorName(message);
    const errorDescription = translateErrorDescription(message);
    const errorReason = translatePossibleReason(message);
    console.error(createErrorMessage(errorName, errorDescription, url, line, errorReason));
    return true;
  }
})(window);