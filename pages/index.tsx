import React, { useState, useEffect } from "react";
import Carousel from "@/components/landingPage/carousel";
import CreateEvent from "@/components/landingPage/createEvent";
import DiscoverEvents from "@/components/landingPage/discoverEvents";
import Services from "@/components/landingPage/services";
import Testimonials from "@/components/landingPage/testimonials";
import UpCommingEvents from "@/components/landingPage/upCommingEvents";
import NewsLetter from "@/components/defaultComponents/newsLetter";
import { useRouter as useNavigation } from "next/navigation";

function Home() {
  return (
    <div>
      <DiscoverEvents />
      <Carousel />
      <UpCommingEvents />
      <Services />
      <CreateEvent />
      <Testimonials />
      <NewsLetter />
    </div>
  );
}

export default Home;
