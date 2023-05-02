import { orderDto } from 'src/order/dto/order.dto';
import Stripe from 'stripe';

export class PaymentService {
  private async createPaymentMethod(body: orderDto): Promise<any> {
    const stripe = new Stripe(process.env.STRIPE_SK, {
      apiVersion: '2022-11-15',
    });

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: body.cardNumber,
        exp_month: body.expirationMonth,
        exp_year: body.expirationYear,
        cvc: body.cvc,
      },
    });

    return { paymentMethodId: paymentMethod.id, stripe };
  }

  public async createCharge(amount: number, body: orderDto): Promise<any> {
    const { paymentMethodId, stripe } = await this.createPaymentMethod(body);

    return await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method: paymentMethodId,
      description: 'All product in cart checked out.',
      confirm: true,
    });
  }
}
