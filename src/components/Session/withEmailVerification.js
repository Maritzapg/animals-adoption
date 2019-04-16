import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
authUser &&
!authUser.emailVerified &&
authUser.providerData
.map(provider => provider.providerId)
.includes('password');

const withEmailVerification = Component => 
{
    class WithEmailVerification extends React.Component 
    {
        constructor(props) {
            super(props);
            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({ isSent: true }));
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                    needsEmailVerification(authUser) ? (
                        <div>
                            {this.state.isSent ? (
                                <p>
                                    E-mail confirmation sent: Check you e-mails (Spam
                                    folder included) for a confirmation e-mail.
                                    Refresh this page once you confirmed your e-Mail.
                                </p>
                            ) : (
                                <p>
                                    Verify your e-mail: Check you e-mails (Spam folder
                                    included) for a confirmation e-mail or send
                                    another confirmation e-mail.
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={this.onSendEmailVerification}
                                disabled={this.state.isSent}
                            >
                                Send confirmation E-Mail
                            </button>
                        </div>
                        ) : (
                        <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            );
        }   
    }
    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;