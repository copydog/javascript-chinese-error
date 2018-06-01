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

  const descriptionDict = {};

  const reasonDict = {};

  const translateErrorName = (message) => {
    const errorName = message.split(':')[0].replace('Uncaught ', '');
    return errorName
      .split(' ')
      .map(item => {
        return typeDict[item] || item
      })
      .join(' ')
  };

  const translateErrorDescription = (message) => {
    const errorDescription = message.split(':')[1];
    return errorDescription
  };


  const createErrorMessage = (name, description, url, line, possibleReason = '') => {
    const encodedDescription = description.trim().replace(/\s/g, '%20')
    return `错误: ${name}`
      + `\n\t错误具体描述: ${description}`
      // + `\n\t错误可能原因: ${possibleReason}`
      + `\n\t错误所在文件: ${url}:${line}`
      + `\n\t错误所在行数: ${line}`
      + `\n\t----- 解决方案 -----`
      + `\n\t翻译描述: https://translate.google.cn/#en/zh-CN/${encodedDescription}`
      + `\n\tCSDN解决方案: https://so.csdn.net/so/search/s.do?q=${encodedDescription}&t=%20&u=`;
  };

  // Waiting for errors
  global.onerror = function (message, url, line) {
    const errorName = translateErrorName(message);
    const errorDescription = translateErrorDescription(message);
    console.error(createErrorMessage(errorName, errorDescription, url, line));
    return true;
  }
})(window);