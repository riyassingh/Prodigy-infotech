import React from 'react';

function Checkout() {
  return (
    <section className='py-10 bg-gray-100'>
      <div className='container mx-auto flex flex-col md:flex-row gap-5 px-5'>
        {/* Left Column - Billing Details */}
        <div className='md:w-2/3'>
          <div className='bg-white shadow-md p-6 rounded-lg'>
            <h1 className='text-2xl font-semibold mb-5'>Billing Details</h1>
            <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col'>
                <label className='font-semibold mb-1'>Full Name</label>
                <input type='text' placeholder='Enter your full name' className='border p-3 rounded w-full' required />
              </div>
              
              <div className='flex flex-col'>
                <label className='font-semibold mb-1'>Email Address</label>
                <input type='email' placeholder='Enter your email' className='border p-3 rounded w-full' required />
              </div>
              
              <div className='flex flex-col'>
                <label className='font-semibold mb-1'>Phone Number</label>
                <input type='text' placeholder='Enter your phone number' className='border p-3 rounded w-full' required />
              </div>
              
              {/* Street Address Section */}
              <div className='col-span-1 md:col-span-2'>
                <label className='font-semibold mb-1'>Street Address</label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input type='text' placeholder='Flat No./House No.' className='border p-3 rounded w-full' required />
                  <input type='text' placeholder='Street Name' className='border p-3 rounded w-full' required />
                  <input type='text' placeholder='City' className='border p-3 rounded w-full' required />
                  <input type='text' placeholder='State' className='border p-3 rounded w-full' required />
                  <input type='text' placeholder='Postal Code' className='border p-3 rounded w-full' required />
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right Column - Order Summary */}
        <div className='md:w-1/3'>
          <div className='bg-white shadow-md p-6 rounded-lg'>
            <div className='mb-4'>
              <img src='https://api.spicezgold.com/download/file_1734774941574_e6mcHGzb_51e00e276f0744eebaf91c9a7b2b15aa.jpg' alt='Product' className='w-full rounded-lg' />
            </div>
            <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>
            <div className='flex justify-between mb-2 text-lg'>
              <span>Subtotal:</span>
              <span>$100.00</span>
            </div>
            <div className='flex justify-between mb-2 text-lg'>
              <span>Shipping:</span>
              <span>$5.00</span>
            </div>
            <div className='flex justify-between font-bold text-xl border-t pt-3 mt-3'>
              <span>Total:</span>
              <span>$105.00</span>
            </div>
            <button type='submit' className='w-full mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition'>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;