import styles from'./App.module.css'
import signUpDesktop from "../assets/images/illustration-sign-up-desktop.svg"
import signUpMobile from "../assets/images/illustration-sign-up-mobile.svg"
import success from "../assets/images/icon-success.svg"
import { useState } from 'react'

function App() {
  const [ subscribeInfo , setSubscribeInfo] = useState({
    email : "",
    showWarn : false,
    showConfirmation: false
  })
  const [ mail , setMail ] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    if (validateEmail(subscribeInfo.email)) {
      setMail(()=>(subscribeInfo.email))
      setSubscribeInfo(prev => ({
        ...prev,
        email: "",
        showConfirmation: true
      }));
    }
  }

function setEmail(e) {
  const newEmail = e.target.value;
  setSubscribeInfo(prev => ({
    ...prev,
    email: newEmail,
    showWarn: false
  }));
}

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    setSubscribeInfo(prev => ({
      ...prev,
      showWarn: !isValid
    }));
    
    return isValid;
  }

  function handleDismiss () {
    setSubscribeInfo(prev => ({
      ...prev,
      showConfirmation: false
    }));
  }
  return (
    <>
      {!subscribeInfo.showConfirmation && 
      <div className={styles.rootElement}>
        <div className={styles.rightSection}>
          <p className={styles.stayPara}>
            Stay updated!
          </p>
          <p className={styles.joinPara}>
            Join 60,000+ product managers receiving monthly updates on:
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              Product discovery and building what matters
            </li>
            <li className={styles.li}>
              Measuring to ensure updates are a success 
            </li>
            <li className={styles.li}>
              And much more!
            </li>
          </ul>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <label htmlFor="email" className={styles.emailLabel}>
              <p className={styles.emailPara}>
                Email address
              </p>
              {subscribeInfo.showWarn && <p className={styles.validEmail}>
                valid email required
              </p>}
            </label>
            <input 
              type="email" 
              name='email' 
              placeholder='email@company.com' 
              className={subscribeInfo.showWarn ? `${styles.emailInput} ${styles.warnEmail}` : styles.emailInput}
              value={subscribeInfo.email}
              onChange={(e) => setEmail(e)}
              noValidate
              formNoValidate
            />
            <button type='submit' className={styles.subscribeButton}>
              Subscribe to monthly newsletter
            </button>
          </form>
        </div>
        <img src={signUpDesktop} alt="" className={styles.desktopImg}/>
        <img src={signUpMobile} alt="" className={styles.mobileImg}/>
      </div>}
      {subscribeInfo.showConfirmation && 
      <div className={styles.rootElement2}>
        <div className={styles.mobileDiv}>
          <img src={success} alt="" />
          <p className={styles.thankHeader}>
            Thanks for subscribing!
          </p>
          <p className={styles.thankPara}>
            A confirmation email has been sent to <span className={styles.span}>{mail}. </span>
            Please open it and click the button inside to confirm your subscription.
          </p>
        </div>
        <button className={styles.dismissButton} onClick={handleDismiss}>
          Dismiss message    
        </button>
      </div>}
    </>
  )
}

export default App