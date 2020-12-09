const Signin = ({ onAuth, isCorrect }) => {
    return (
        <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center center-center">
            <main className="pa4 black-80 center">
                <div className="measure">
                    <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
                        <span className="incorrect red">{!isCorrect ? 'Incorrect email or password.' : ''}</span>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>

                    <div className="tc">
                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={onAuth} >Sign In</button>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Signin;