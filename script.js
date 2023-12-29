const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// 展示错误信息
function showError(input,message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// 展示成功时的外轮廓
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// 检查邮箱的格式
function checkEmail(input) {
  const re= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 if(re.test(input.value.trim())){
  showSuccess(input);
 } else{
  showError(input,'Email无效');
 }
}

// 检查是否必须
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if(input.value.trim() == ''){
      showError(input,`${getFieldName(input)} 是必须的`)
      isRequired= true;
    }else {
      showSuccess(input);
    }
  });
  return isRequired;
}
// 检查长度
function checkLength(input,min,max){
      if(input.value.length < min){
        showError(
          input,
          `${getFieldName(input)} 必须不少于 ${min} 长度`
        );
      } else if(input.value.length > max) {
        showError(
          input,
          `${getFieldName(input)} 必须不多于 ${max} 长度`
        );
      } else {
        showSuccess(input);
      }
}
// 检查密码配对
function checkPasswordsMatch(input1,input2) {
  if(input1.value !== input2.value) {
    showError(input2,'两次密码不一致');
  }
}


// 获取有效的名字
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() +  input.id.slice(1);
}
// 事件监听
form.addEventListener('submit',function(e){
  e.preventDefault();
  if(!checkRequired([username,email,password,password2])){
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);

  }
});