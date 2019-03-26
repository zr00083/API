const nm = require('nodemailer');
const fs = require('fs');
const hogan = require('hogan.js');

function sendMail(from, recipient, subject, text, test = false, filepath = "", data = {}) {
  var account;

  console.log(process.cwd());

  // if the test flag is set
  if(test){
    //generate a test account using ethereal
    nm.createTestAccount((err, account) =>{
      //create transporter using ethereal details
      let transporter = nm.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: account.user, // generated ethereal user
              pass: account.pass  // generated ethereal password
          }
      });

      var mailOptions;

      try {
        var raw_html = fs.readFileSync(filepath,'utf-8');
        //compile the file using hogan
        var compiled = hogan.compile(raw_html);
        mailOptions = { //if there isn't an error then set the html attribute to the data we read from the file
          from: from, // sender address
          to: recipient, // list of receivers
          subject: subject, // Subject line
          text: text, // plain text body,
          html: compiled.render(data)
        };
      }catch(err){
        console.log(err);
        mailOptions = {
          from: from, // sender address
          to: recipient, // list of receivers
          subject: subject, // Subject line
          text: text // plain text body
        };
      }

        console.log(mailOptions);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            }else{
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nm.getTestMessageUrl(info));
              return true;
            }
        });
      });
  }else{
    //otherwise get the values for production
    account = {user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS}
    //create transporter using ethereal details
    let transporter = nm.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    var mailOptions;

    try {
      var raw_html = fs.readFileSync(filepath,'utf-8');
      //compile the file using hogan
      var compiled = hogan.compile(raw_html);
      mailOptions = { //if there isn't an error then set the html attribute to the data we read from the file
        from: from, // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body,
        html: compiled.render(data)
      };
    }catch(err){
      console.log(err);
      mailOptions = {
        from: from, // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: text // plain text body
      };
    }

      console.log(mailOptions);

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
              return false;
          }else{
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nm.getTestMessageUrl(info));
            return true;
          }
      });
  }


}


exports.sendMail = sendMail;
