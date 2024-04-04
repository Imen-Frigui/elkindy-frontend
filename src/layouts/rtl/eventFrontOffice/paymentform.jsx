import React, { useState, useEffect } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { createPaymentIntent } from '../../../services/reservation/reservationService';
import { MdPayment } from "react-icons/md";
import { FaHandHoldingUsd , FaHandPointLeft} from "react-icons/fa";


const PaymentForm = ({ onSuccessfulPayment,onProceedLater }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [amountError, setAmountError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
   // Create a PaymentIntent on the server
   const { clientSecret, error: backendError } = await createPaymentIntent({ 
    amount: amount * 100 , 
    email: email,
  }); 

   if (backendError) {
     toast.error(`Payment failed: ${backendError.message}`);
     return;
   }
   
    const cardElement = elements.getElement(CardElement);

     // Confirm the payment on the client
     const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        // Additional payment method details here if necessary
      },
    });

    if (stripeError) {
      console.log('[error]', stripeError);
      toast.error(`Payment failed: ${stripeError.message}`);
    } else {
      console.log('[PaymentIntent]', paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        onSuccessfulPayment(paymentIntent);
        // toast.success("Payment successful!"); 
      }
    }
  };


  useEffect(() => {
    let valid = true;

    // Amount validation
    if (amount === '') {
      setAmountError('Amount is required');
      valid = false;
    } else if (parseFloat(amount) <= 0 || parseFloat(amount) > 200) {
      setAmountError('Amount must be between 1 and 200');
      valid = false;
    } else {
      setAmountError('');
    }

    // Email validation
    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    setIsFormValid(valid);
  }, [amount, email]);

  return (

<form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center">
        <label className="font-semibold"> Enter payment amount&nbsp;&nbsp;</label> 
        <FaHandHoldingUsd className="text-lg text-blue-500 mr-2" />
      </div>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
        min="1"
        max="200"
        step="any"
        className="mt-1 p-2 border rounded-md w-full"
      />
            {amountError && <p className="text-red-500 text-xs">{amountError}</p>}

      <div className="flex items-center">
        <label className="font-semibold">Enter your email here</label>
      </div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter you email address"
        className="mt-1 p-2 border rounded-md w-full"
      />
      {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
      <CardElement className="p-4 bg-white rounded-lg shadow-sm border border-gray-300" />
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!stripe || !isFormValid}
          className="focus:ring-blue-300 inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <MdPayment />
          &nbsp;&nbsp; Pay Now
        </button>
        <button
          type="button"
          onClick={onProceedLater} 
          className="focus:ring-gray-300 inline-flex items-center justify-center rounded-lg border border-transparent bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FaHandPointLeft />
          &nbsp;&nbsp;   Proceed Later
        </button>
      </div>
    </form>
    
  );
};

export default PaymentForm;
