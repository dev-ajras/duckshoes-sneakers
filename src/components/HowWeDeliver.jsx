import WorkInProgress from './WorkInProgress';

function HowWeDeliver() {
  return (
    <div className="flex justify-center">
      <div className="m-3 sm:m-5 max-w-6xl w-full">
        <h3 className="font-bold text-lg mb-3 sm:mb-5 sm:text-3xl">
          How we deliver
        </h3>
        <p>
          At Duck Shoes, we take pride in providing fast and reliable shipping
          services to our valued customers. Here's how we ensure your orders
          reach your doorstep securely and promptly
        </p>
        <div className="my-3 sm:my-5">
          <h4 className="font-semibold mb-0.5">Step 1: Place Your Order</h4>
          <p>
            Browse our website, add your desired items to the cart, and proceed
            to checkout. Input your shipping details and contact information.
          </p>
        </div>
        <div className="my-3 sm:my-5">
          <h4 className="font-semibold mb-0.5">Step 2: Order Processing</h4>
          <p>
            Once we receive your order, our dedicated team springs into action.
            We carefully pick and pack your items to ensure they remain
            protected during transit.
          </p>
        </div>
        <div className="my-3 sm:my-5">
          <h4 className="font-semibold mb-0.5">
            Step 3: Shipping and Tracking
          </h4>
          <p>
            We collaborate with reputable courier services to guarantee
            efficient and on-time deliveries. You'll receive a tracking number
            to monitor your package's progress until it reaches you.
          </p>
        </div>
        <div className="my-3 sm:my-5">
          <h4 className="font-semibold mb-0.5">Step 4: Delivery</h4>
          <p>
            Sit back and relax while our shipping partners work diligently to
            deliver your package to your designated address. Timely deliveries
            are our priority.
          </p>
        </div>
        <div className="my-3 sm:my-5">
          <h4 className="font-semibold mb-0.5">Step 5: Receive Your Order</h4>
          <p>
            We hope you're delighted with your purchase. Should any issues
            arise, our friendly customer support team is always ready to assist
            you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowWeDeliver;
