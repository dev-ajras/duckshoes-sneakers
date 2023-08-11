import { AiFillCheckCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

function Payment() {
  return (
    <section className="flex justify-center">
      <div className="m-3 sm:m-5 max-w-6xl w-full">
        <h3 className="font-bold text-lg mb-3 sm:mb-5 sm:text-2xl">Payment</h3>
        <div className="flex flex-col items-center mt-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <AiFillCheckCircle className="fill-green-700 w-28 h-28 md:w-36 md:h-36 " />
          </motion.div>
          <h4 className="sm:text-xl font-semibold mt-2">
            Thanks for your purchase!
          </h4>
        </div>
      </div>
    </section>
  );
}

export default Payment;
