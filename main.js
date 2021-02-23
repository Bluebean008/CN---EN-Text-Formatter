const inputText = document.getElementById('input-text');
const btnFormat = document.getElementById('btn-format');
const outputText = document.getElementById('output-text');
const result = document.getElementById('result');
const btnCopy = document.getElementById('btn-output-copy');

btnFormat.addEventListener('click', () => {
  const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
  //console.log(REGEX_CHINESE.test(str));
  var symbol = /[`，。、；‘【】、·《》？：“{}|——）（*&……%￥#！~”“!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  let inPara = inputText.value;
  let outPara = '';
  let lastLang = REGEX_CHINESE.test(inPara[0]) ? 'CN' : 'EN';
  outPara.innerHTML = '';
  for (i = 0; i < inPara.length; i++) {
    let word = inPara[i];
    if (REGEX_CHINESE.test(word)) {
      if (lastLang == 'EN') {
        outPara += `\n${word}`;
        lastLang = 'CN';
      } else if (word == ' ' || word == '\n') {
      } else {
        outPara += word;
      }
    } else {
      if (lastLang == 'CN') {
        if (word == ' ' || word == '\n') {
        } else if (symbol.test(word)) {
          outPara += word;
        } else {
          outPara += `\n${word}`;
          lastLang = 'EN';
        }
      } else {
        if (word == '\n') {
          outPara += ' ';
        } else {
          outPara += word;
        }
      }
    }
  }
  res = outPara.replace('  ', ' ');
  outputText.innerHTML = res;
  result.style.visibility = 'visible';
});

btnCopy.addEventListener('click', () => {
  console.log('hello world');
  var text = outputText;
  text.select();
  document.execCommand('copy');
  alert('Text copied ');
});
