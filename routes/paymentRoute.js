import express from  'express';
import { getPaymentByOrderId, processPayment } from '../controllers/payment.js';

const paymentRoute =  express.Router();

paymentRoute.post("/payment" , processPayment);
paymentRoute.get("payment/:id" , getPaymentByOrderId);

export default paymentRoute;

