const $setLogin = $('#login');
const $setSignUp = $('#signup');
const $submitButton = $('#submit');
const $emailInput = $('#email');
const $passwordInput = $('#password');
const $message = $('#message');

let authSetting = 'login';

function setAuth(setting) {
  authSetting = setting;
  
  if (authSetting === 'login') {
    $setLogin.addClass('active');
    $setSignUp.removeClass('active');
    $submitButton.text('Log In');
  } else {
    $setSignUp.addClass('active');
    $setLogin.removeClass('active');
    $submitButton.text('Sign Up');
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

if (!email || !password) {
    displayMessage('Email and password fields cannot be blank.', 'danger');
    return;
  }

//   $emailInput.val('');
//   $passwordInput.val('');

//   authenticateUser(email, password);
// }

 console.log(
    `Email: ${email} Password: ${password} AuthSetting: ${authSetting}`
  );
}

function displayMessage(message, type) {
  $message.text(message).attr('class', type);
}

function handleSignupResponse(status) {
  if (status === 'success') {
    displayMessage('Registered successfully! You may now sign in.', 'success');
  } else {
    displayMessage(
      'Something went wrong. A user with this account may already exist.',
      'danger'
    );
  }
}

function handleLoginResponse(data, status, jqXHR) {
  console.log(status, data, jqXHR);
}

function authenticateUser(email, password) {
  $.ajax({
    url: '/' + authSetting,
    data: {
      user: {
        email,
        password
      }
    },
    method: 'POST'
  })
    .then(function(data, status, jqXHR) {
      if (authSetting === 'signup') {
        handleSignupResponse(status);
        } else {
        handleLoginResponse(data, status, jqXHR);
      }
    })
    .catch(function(err) {
      if (authSetting === 'signup') {
        handleSignupResponse(err.statusText);
      } else {
        handleLoginResponse(err.statusText);
      }
    });
}

$setLogin.on('click', setAuth.bind(null, 'login'));
$setSignUp.on('click', setAuth.bind(null, 'signup'));
$submitButton.on('click', handleFormSubmit);