var po = require('page-object-js'),
    Button = po.Button,
    Span = po.Span;

module.exports = function SignupFormPage() {
    this.url            = 'http://localhost:3000/simple_form.html';
    this.signUp         = new Button({id: 'sign-up'});
    this.foo            = new Button({id: 'foo'});
    this.deleteDatabase = new Button({id: 'delete-database'});
    this.submitCount    = new Span({id: 'submit-count'});
};
