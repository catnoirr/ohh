const CouponCard = () => {
  return (
    <div className="w-[12.5rem] h-[13rem] mx-auto bg-[#F2F0F5] px-5 overflow-hidden mt-4">
      <div className="text-gray-700 text-center">
        <p className="text-[10px] pt-[2px] text-[#9A9A9A] font-extralight">
          Coupon Id:{" "}
          <span className="font-medium text-[10px] text-[#9A9A9A]">
            63839HGJF
          </span>
        </p>
      </div>

      <div className="relative text-center px-2 flex items-center">
        <img
          src="/image.png"
          alt="TradeFlex Logo"
          className="h-[24px] w-[24px]"
        />
        <h2 className="text-lg font-semibold mx-auto">TradeFlex</h2>
        <div className="border-t-2 border-dashed w-[12rem] -left-[20px] absolute border-purple-900 -bottom-1"></div>
        <div className="h-10 w-10 absolute top-1/2 -left-10 bg-[#341266] rounded-full"></div>
        <div className="h-10 w-10 absolute top-1/2 -right-10 bg-[#341266] rounded-full"></div>
      </div>
      <div className="relative">
        <img
          src="/coupon.png"
          alt="TradeFlex Logo"
          className="h-[4.5rem] mt-2 mx-auto"
        />
        <h2 className="font-[800] text-lg absolute top-2 left-[4rem]">10%</h2>
        <h2 className="font-medium text-sm text-white absolute top-8 left-[3.5rem]">
          Discount
        </h2>
      </div>

      <div className="text-black text-[10px] mt-2">
        <p className="font-thin">
          Expiry Date: <span className="ml-2">21 Dec 2024</span>
        </p>
        <div className="flex items-start leading-tight gap-2 mt-1">
          <p className="font-thin">
            Vendor <br /> Address:
          </p>
          <p>124/B, MG Road, Bengaluru, Karnataka 560001</p>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
