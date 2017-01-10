var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();
const resolve = require('path').resolve;

var api = new ParseServer({
  verbose     : true,                                                           // 모든 서버 로그를 보고 싶으면 true
  appId       : process.env.DATABASE_URI || 'FIXME',
  masterKey   : process.env.MASTER_KEY   || 'FIXME',                                   // FIXME: Keep this key secret!
  databaseURI : process.env.DATABASE_URI || 'mongodb://localhost:27017/YOUR_MONGO_DB', // FIXME: Connection string for your MongoDB database

  port        : process.env.PORT         || '1337',
  serverURL   : process.env.SERVER_URL   || 'http://localhost:1338/parse',      // FIXME: Don't forget to change to https if needed
  cloud       : process.env.CLOUD        || './cloud/main.js',                  // Absolute path to your Cloud Code
  fileKey     : process.env.FILE_KEY     || 'FIXME',                            // FIXME:


  // 이메일 확인 기능을 적용하고 싶지 않으면 false, 이후 설정 모두 무시
  verifyUserEmails: true,

  // if `verifyUserEmails` is `true` and
  //     if `emailVerifyTokenValidityDuration` is `undefined` then
  //        email verify token never expires
  //     else
  //        email verify token expires after `emailVerifyTokenValidityDuration`
  //
  // `emailVerifyTokenValidityDuration` defaults to `undefined`
  //
  // email verify token below expires in 2 hours (= 2 * 60 * 60 == 7200 seconds)
  emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)

  // 이메일 인증을 완료하지 않으면 사용자를 막는기능, 기본은 false
  // set preventLoginWithUnverifiedEmail to false to allow user to login without verifying their email
  // set preventLoginWithUnverifiedEmail to true to prevent user from login if their email is not verified
  preventLoginWithUnverifiedEmail: false, // defaults to false

  // 이메일 인증 메일에 들어가는 서버 주소
  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords.
  // Set the mount path as it is in serverURL
  publicServerURL: 'https://example.com/parse',

  // 이메일 인증 메일을 보낼때 들어가는 서비스 이름
  // Your apps name.
  // This will appear in the subject and body of the emails that are sent.
  appName: 'Parse App',


  // The email adapter
  emailAdapter: {
    module: 'parse-server-mailgun',
    options: {
      // The address that your emails come from
      fromAddress: 'DevCafe Team',
      // Your domain from mailgun.com
      domain: 'rlibro.com',
      // Your API key from mailgun.com
      apiKey: 'key-api-key',

      templates: {
        passwordResetEmail: {
          subject: '비밀번호를 변경합니다.',
          pathPlainText: resolve(__dirname, 'templates/password_reset_email.txt'),
          pathHtml: resolve(__dirname, 'templates/password_reset_email.html'),
          callback: (user) => { return { firstName: user.get('firstName') }}
          // Now you can use {{firstName}} in your templates
        },
        verificationEmail: {
          subject: 'Confirm your account',
          pathPlainText: resolve(__dirname, 'templates/verification_email.txt'),
          pathHtml: resolve(__dirname, 'templates/verification_email.html'),
          callback: (user) => { return { firstName: user.get('firstName') }}
          // Now you can use {{firstName}} in your templates
        },
        customEmailAlert: {
          subject: 'Urgent notification!',
          pathPlainText: resolve(__dirname, 'templates/custom_alert.txt'),
          pathHtml: resolve(__dirname, 'templates/custom_alert.html'),
        }
      }
    }
  },

  // 인증 메일 시도시 자동 잠김
  // account lockout policy setting (OPTIONAL) - defaults to undefined
  // if the account lockout policy is set and there are more than `threshold` number of failed login attempts then the `login` api call returns error code `Parse.Error.OBJECT_NOT_FOUND` with error message `Your account is locked due to multiple failed login attempts. Please try again after <duration> minute(s)`. After `duration` minutes of no login attempts, the application will allow the user to try login again.
  accountLockout: {
    duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
    threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
  },


  // 패스워드 정책
  // optional settings to enforce password policies
  passwordPolicy: {
    // Two optional settings to enforce strong passwords. Either one or both can be specified.
    // If both are specified, both checks must pass to accept the password
    // 1. a RegExp representing the pattern to enforce
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
    // 2. a callback function to be invoked to validate the password
    validatorCallback: (password) => { return validatePassword(password) },
    doNotAllowUsername: true, // optional setting to disallow username in passwords
    maxPasswordAge: 90, // optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset.
    maxPasswordHistory: 5, // optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
    //optional setting to set a validity duration for password reset links (in seconds)
    resetTokenValidityDuration: 24*60*60, // expire after 24 hours
  }

});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.use(express.static(__dirname + '/public'));

app.listen(1338, function() {
  console.log('alcong-server running on port 1338.');
});
