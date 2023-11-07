var nodemailer = require('nodemailer');
const templateMail = require('../template');
const getFormSendMail = (req, res) => {
    res.render("form_mail");
};

const sendMailNodejs = async (req, res) => {
    const { email, subject, content } = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pipclupnomad@gmail.com',
            pass: '',
        },
    });

    var mailOptions = {
        from: 'your-gmail',
        to:email,
        subject: subject,
        html: templateMail(subject, content)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            req.session.message = {
                type: 'error',
                message: 'some thing error, check your mail again'
            }
            res.redirect('/email');
        } else {
            req.session.message = {
                type: 'success',
                message: 'send mail successfully'
            }
            res.redirect('/email');
        }
    })
}

module.exports = {
    getFormSendMail,
    sendMailNodejs
}
