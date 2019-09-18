import React, {Component} from 'react';
// Components
import { connect } from 'react-redux';
import { Button } from 'components';
import { UserAction } from 'actions';
import { ApiService } from 'services';


class Login extends Component {

    constructor(props) {
        // Inherit constructor
        super(props);
        // State for form data and error message
        this.state = {
            form: {
            username: '',
            key: '',
            error: '',
            },
        }

        //Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
    
        this.setState({
          form: {
            ...form,
            [name]: value,
          },
          error: '',
        });
    }

    handleSubmit(event) {
        //Suppress the default submit behavior
        event.preventDefault();

        const { form } = this.state;
        const { setUser } = this.props;

        //Send a login to the blockchain via ApiService
        //If it succeeds, save the username to Redux store
        //Otherwise, we save the error so that the message can be displayed
        return ApiService.login(form)
        .then(() => {
          setUser({ name: form.username })
        })
        .catch(err => {
          this.setState ({ error: err.toString() });
          console.log(err.toString());
        });
    }

    render() {
        //Extracted some data from the state
        const { form, error } = this.state;
        return (
            <div className="Login">
            <div className="title">Elemental Battles - powered by EOSIO</div>
            <div className="description">Please use the Account Name and Private Key generated in the previous page to log into the game.</div>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className="field">
                <label>Account name</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={this.handleChange}
                  placeholder="All small letters, a-z, 1-5 or dot, max 12 characters"
                  pattern="[\.a-z1-5]{2,12}"
                  required
                />
              </div>
              <div className="field">
                <label>Private key</label>
                <input
                  type="password"
                  name="key"
                  value={form.key}
                  onChange={this.handleChange}
                  pattern="^.{51,}$"
                  required
                />
              </div>
              <div className="bottom">
                <Button type="submit" className="green">
                  { "CONFIRM" }
                </Button>
              </div>
              <div className="field form-error">
                { error && <span className="error">{error}</span>}
              </div>
            </form>
          </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setUser: UserAction.setUser,
}

// export a Redux-connected React component
export default connect(mapStateToProps, mapDispatchToProps)(Login);