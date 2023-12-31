import React, { useRef, useEffect, useState } from "react";
import EventCard from "./components/eventCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMedia } from "react-use";
import lookupStore from "@/store/lookups.store";
import { useRouter as useNavigation } from "next/navigation";

function UpCommingEvents() {
  const navigation = useNavigation();
  const isSmallScreen = useMedia("(max-width: 600px)");
  const isMediumScreen = useMedia("(min-width: 601px) and (max-width: 768px)");
  const sliderRef = useRef<Slider | null>(null);
  const [events, setEvents] = useState([]);
  const { systemLookups, loading } = lookupStore;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { events = [] } = await systemLookups; // Assuming systemLookups is a Promise
        setEvents(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [systemLookups]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: isSmallScreen ? 1 : isMediumScreen ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  const moveNextEvent = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const movePreviousEvent = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  return (
    <div className="lg:grid grid-cols-1 md:grid-cols-4 gap-4 mt-[30px]">
      <div className="lg:col-span-1 p-4">
        <div>
          <span className="text-[48px] font-[600]">Upcoming Events</span>
        </div>
        <div>
          <span className="text-[24px] font-[500] text-[#797979]">
            Stary exploring
          </span>
        </div>

        <div className="flex gap-3">
          <div
            className="h-[70px] w-[70px] rounded-[50px] flex items-center justify-center hover:shadow-lg p-6 bg-white cursor-pointer"
            onClick={movePreviousEvent}
          >
            <img src="/assets/images/arrow-left.svg" alt="left-arrow" />
          </div>
          <div
            className="h-[70px] w-[70px] rounded-[50px] flex items-center justify-center hover:shadow-lg p-6 bg-white cursor-pointer"
            onClick={moveNextEvent}
          >
            <img src="/assets/images/arrow-right.svg" alt="right-arrow" />
          </div>
        </div>
      </div>
      <div
        className={!isSmallScreen && !isMediumScreen ? "col-span-3" : "w-full"}
      >
        <Slider {...settings} ref={sliderRef}>
          {events.map((card: any) => (
            <div key={card}>
              <div
                className={
                  isMediumScreen ? "pl-[20px] cursor-pointer" : "cursor-pointer"
                }
                onClick={() => {
                  navigation.push(`/events/details?id=${card?.id}`);
                }}
              >
                <EventCard event={card.attributes} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default UpCommingEvents;
