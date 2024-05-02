import React, { useState } from 'react';
import axios from 'axios';

function PaymentPageGenerator() {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [error, setError] = useState(null);

    const generatePaymentPage = async () => {
        const requestBody = {
            app_token: "<APP_TOKEN>",
            app_secret: "<APP_SECRET>",
            amount: 30500,
            accept_card: true,
            session_timeout_secs: 1200,
            success_link: "https://example.website.com/success",
            fail_link: "https://example.website.com/fail",
            developer_tracking_id: "<your_internal_tracking_id>"
        };

        try {
            const response = await axios.post('https://developers.flouci.com/api/generate_payment', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setPaymentUrl(response.data.payment_url);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {paymentUrl ? (
                <div>
                    <p>Payment URL: {paymentUrl}</p>
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Proceed to Payment</a>
                </div>
            ) : (
                <button onClick={generatePaymentPage}>Generate Payment Page</button>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default PaymentPageGenerator;