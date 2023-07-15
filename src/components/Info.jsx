import creditCard from '/assets/info/duckCreditCard.svg';
import shipping from '/assets/info/duckShipping.svg';
import secure from '/assets/info/duckSecure.svg';

function Info() {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col items-center p-8">
        <img className="w-16" src={creditCard} alt="creditCard info" />
        <h4 className="font-semibold text-center mt-3">Payment by card</h4>
        <p className="text-center">Online, Card, interest-free payments</p>
      </div>
      <span className="flex m-auto bg-grayDuck h-[3px] w-32 "></span>
      <div className="flex flex-col items-center p-8">
        <img className="w-16" src={shipping} alt="shipping info" />
        <h4 className="font-semibold text-center mt-3">Free shipping</h4>
        <p className="text-center">Free shipping on orders over $300</p>
      </div>
      <span className="flex m-auto bg-grayDuck h-[3px] w-32 "></span>
      <div className="flex flex-col items-center p-8">
        <img className="w-14" src={secure} alt="secure info" />
        <h4 className="font-semibold text-center mt-3">Secure purchase</h4>
        <p className="text-center">
          Not satisfied? 30 days to return your purchase
        </p>
      </div>
    </div>
  );
}

export default Info;
