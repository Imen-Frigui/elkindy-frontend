// PaymentPage.jsx

import React, { useState } from 'react';
import Button from './Button';

function PaymentPage() {
    const [paymentLink, setPaymentLink] = useState('');

    async function generatePaymentPage() {
        try {
            const response = await fetch('http://localhost:3000/api/users/generate-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to generate payment page');
            }

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.result && responseData.result.link) {
                setPaymentLink(responseData.result.link);
            } else {
                throw new Error('Payment link not found in response');
            }
        } catch (error) {
            console.error('Error generating payment page:', error);
        }
    }

    function redirectToPaymentPage() {
        window.location.href = paymentLink;
    }

    return (
        <div className="text-center mt-8">
            <h1 className="text-3xl font-bold mb-4">Payment Page</h1>
            <div className="flex justify-center">
                <Button onClick={generatePaymentPage}>Generate Payment Page</Button>
                {paymentLink && (
                    <div className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <Button onClick={redirectToPaymentPage} className="ml-4">Proceed to Payment</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentPage;
