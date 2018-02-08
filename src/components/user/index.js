import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { userFBInitialized, userSet } from 'src/actions';
import styles from './styles.scss';

const FB_APP_ID = '1411966735597510';
const FB_VERSION = 'v2.12';

const connectFacebook = () => {
  const id = 'facebook-jssdk';

  if (document.getElementById(id)) return;

  const fjs = document.getElementsByTagName('script')[0];
  const js = document.createElement('script');

  js.id = id;
  js.src = `https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=${FB_VERSION}&appId=${FB_APP_ID}&autoLogAppEvents=1`;
  fjs.parentNode.insertBefore(js, fjs);
};

class User extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFBInitialized: false,
    };

    this.getLoginStatus = this.getLoginStatus.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FB_APP_ID,
        autoLogAppEvents: true,
        cookie: true,
        xfbml: true,
        version: FB_VERSION,
      });

      // mark the FB API as initialized
      this.props.onFBInitialized();

      // after initialization, get the login status
      this.getLoginStatus();
    };

    connectFacebook();
  }

  getLoginStatus() {
    const { onSet } = this.props;

    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        window.FB.api('/me', me => {
          window.FB.api(`/${response.authResponse.userID}/picture`, picture => {
            onSet({ ...me, avatar: picture.data.url });
          });
        });
      } else {
        onSet();
      }
    });
  }

  onLogin() {
    window.FB.login(response => {
      if (response.authResponse) {
        this.getLoginStatus();
      }
    });
  }

  onLogout() {
    window.FB.logout(() => {
      this.props.onSet();
    });
  }

  render() {
    const { isFBInitialized, user, className } = this.props;

    return (
      <div className={`${styles.user} ${className}`}>
        <div id="fb-root" />
        {user.avatar && (
          <img src={user.avatar} alt={user.name} className={styles.avatar} />
        )}
        <div className={styles.data}>
          {user.name && (
            <div className={styles.name}>
              {user.name}
            </div>
          )}
          {isFBInitialized && !user.id && (
            <button className={styles.button} onClick={this.onLogin}>Login</button>
          )}
          {isFBInitialized && user.id && (
            <button className={styles.button} onClick={this.onLogout}>Logout</button>
          )}
        </div>
      </div>
    );
  }
}

User.propTypes = {
  isFBInitialized: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  onFBInitialized: PropTypes.func.isRequired,
  onSet: PropTypes.func.isRequired,
};

User.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  isFBInitialized: state.user.isFBInitialized,
  user: state.user.profile,
});

const mapDispatchToPtops = dispatch => ({
  onFBInitialized: () => dispatch(userFBInitialized()),
  onSet: (user = {}) => dispatch(userSet(user)),
});

export default connect(mapStateToProps, mapDispatchToPtops)(User);
