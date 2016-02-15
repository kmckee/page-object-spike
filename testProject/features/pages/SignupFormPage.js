var po = require('page-object-js'),
    Button = po.Button,
    Span = po.Span;

module.exports = function SignupFormPage() {
    this.signUp = new Button({id: 'sign-up'});
    this.foo = new Button({id: 'foo'});
    this.submitCount = new Span({id: 'submit-count'});
    this.deleteDatabase = new Button({ id: 'delete-database' });
};
