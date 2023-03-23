import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidty, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid
    });

    const formIsValid = enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid &&
    enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    };

  const nameControlClasses = `${classes.control} ${formInputValidty.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValidty.street ? '' : classes.invalid}`;
  const postalControlClasses = `${classes.control} ${formInputValidty.postalCode ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidty.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputValidty.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputValidty.street && <p>Please enter a valid street address.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        {!formInputValidty.postalCode && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputValidty.city && <p>Please enter a valid city name.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;