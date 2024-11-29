import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SpinWheel = ({ pricePerScan, user, vendor, campaign, data }) => {
  const wheelRef = useRef(null);
  const [finalValue, setFinalValue] = useState("Click On The Spin Button To Start");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prize, setPrize] = useState(null);

  const router = useRouter();

  let myChart = useRef(null);

  useEffect(() => {
    const wheel = wheelRef.current;

    const data = [16, 16, 16, 16, 16, 16]; // Equal slices for the wheel
    const pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"]; // Wheel colors

    wheel.width = 30;  // Set desired width
    wheel.height = 30; // Set desired height

    myChart.current = new Chart(wheel, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: {
        labels: [1, 2, 3, 4, 5, 6], // Wheel labels corresponding to prize segments
        datasets: [
          {
            backgroundColor: pieColors,
            data: data,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: { display: false },
          datalabels: {
            color: "#ffffff",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 24 },
          },
        },
      },
    });

    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, []);

  let count = 0;
  let resultValue = 101;

  // Normalize the angle so it's always between 0 and 359 degrees
  const normalizeAngle = (angle) => {
    return angle % 360;
  };

  // Function to handle prize calculation based on the final angle
  const valueGenerator = async (angleValue) => {
    const normalizedAngle = normalizeAngle(angleValue); // Ensure angle is between 0 and 359

    const prizeSegments = [
      { minDegree: 0, maxDegree: 30, prize: parseInt(data.secondPrize) }, // First prize
      { minDegree: 31, maxDegree: 90, prize: parseInt(data.firstPrize) }, // Second prize
      { minDegree: 91, maxDegree: 150, prize: parseInt(data.sixthPrize) }, // Third prize
      { minDegree: 151, maxDegree: 210, prize: parseInt(data.fifthPrize) }, // Fourth prize
      { minDegree: 211, maxDegree: 270, prize: parseInt(data.fourthPrize) }, // Fifth prize
      { minDegree: 271, maxDegree: 330, prize: parseInt(data.thirdPrize) }, // Sixth prize
      { minDegree: 331, maxDegree: 360, prize: parseInt(data.secondPrize) },
    ];

    for (let segment of prizeSegments) {
      if (normalizedAngle >= segment.minDegree && normalizedAngle <= segment.maxDegree) {
        setFinalValue(`Congratulations! You won: ₹${segment.prize}`); // Update UI with correct prize
        setIsSpinning(false);
        setPrize(segment.prize);
        setShowModal(true);
        const cid = `CID${Date.now()}`;
        const coupon = {
          couponId: cid,
          couponAmount: segment.prize, // The prize won
          pricePerScan,
          campaignId: campaign.campaignId,
          isRedeemed: false,
          expiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Expiry in 2 days
          vendorId: vendor.vid,
        };

        try {
          // Update the user's coupons
          await fetch("/api/updateUser", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.userId,
              coupons: user.coupons ? [...user.coupons, coupon] : [coupon],
            }),
          });

          // Update the vendor's coupons
          await fetch("/api/updateVendor", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vendorId: vendor.vid,
              coupons: vendor.coupons ? [...vendor.coupons, coupon] : [coupon],
            }),
          });

          router.push("/coupons"); // Redirect to the coupons page after spin
        } catch (error) {
          console.error("Error updating user/vendor data:", error);
        }
        break; // Exit the loop after assigning the prize
      }
    }
  };

  const spinWheel = () => {
    setIsSpinning(true);
    setFinalValue("Good Luck!");

    let randomDegree = Math.floor(Math.random() * 360); // Random stopping point on the wheel

    let rotationInterval = setInterval(() => {
      myChart.current.options.rotation += resultValue; // Rotate the wheel
      myChart.current.update();

      // Reset rotation after a full circle
      if (myChart.current.options.rotation >= 360) {
        count += 1;
        resultValue -= 5; // Gradually slow down the wheel
        myChart.current.options.rotation = 0;
      } else if (count > 15 && myChart.current.options.rotation === randomDegree) {
        valueGenerator(randomDegree); // Determine the prize based on the final angle
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  };

  const PrizeModal = ({ prize, onClose }) => {
    console.log(prize)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white shadow-lg p-6 relative max-w-sm mx-auto">
        <Image
        src="/giftBox.png"
        width={100}
        height={100}
        className="w-40 z-20 -mt-32 mx-auto right-24 top-40"
      />
          <div className="text-center">
          <p className="mt-2 text-2xl">TradeFlex</p>
            <h2 className="text-2xl font-bold text-purple-700">Congratulations!</h2>
            <p className="mt-2 text-lg">You won ₹{prize}</p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mt-4"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="relative sm:w-[30rem] w-full bg-[#341266] min-h-screen">
      <Image
        src="/logo.png"
        width={100}
        height={100}
        className="w-14 m-8"
      />
      <h1 className="text-2xl font-extrabold text-white text-center">Spin the Wheel</h1>
      <h1 className="text-sm text-white text-center mt-2">Get instant discounts on <br /> Products</h1>
      <Image
        src="/circle.png"
        width={100}
        height={100}
        className="w-24 absolute z-20 -mt-20 right-24 top-40"
      />
      <Image
        src="/circle.png"
        width={100}
        height={100}
        className="w-16 absolute z-0 right-10 bottom-64"
      />
      {showModal && <PrizeModal prize={prize} onClose={() => setShowModal(false)} />}

      <div className="container bg-white p-2 rounded-full mx-auto mt-5">
        <canvas ref={wheelRef} id="wheel"></canvas>
        <button id="spin-btn" onClick={() => !isSpinning && spinWheel()}>
          Spin
        </button>
        <img
          src="/arrow.png"
          alt="spinner arrow"
          style={{ height: "auto", width: "100px", position: "absolute", top: "50%", left: "100%", transform: "translate(-50%, -50%)" }}
        />
        <div id="final-value" style={{ color: "white" }}>
          <p>{finalValue}</p>
        </div>
      </div>
      <Image
        src="/gift1.png"
        width={100}
        height={100}
        className="w-32 absolute left-0 bottom-0 sm:max-h-60 max-h-36"
      />
      <Image
        src="/gift2.png"
        width={100}
        height={100}
        className="w-24 absolute left-24 bottom-0"
      />
      <Image
        src="/bag1.png"
        width={100}
        height={100}
        className="w-32 absolute right-0 bottom-0 sm:max-h-60 max-h-36"
      />
      <Image
        src="/bag2.png"
        width={100}
        height={100}
        className="w-24 absolute right-14 bottom-0"
      />
    </div>
  );
};

export default SpinWheel;
