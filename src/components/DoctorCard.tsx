import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import clsx from "clsx";

interface DoctorCardProps {
  id: number;
  name: string;
  image: string;
  specialization: string;
  Rate: string ;
  rating: number;
  location: string;
  experience: number;
  availability: string;
  style?: React.CSSProperties;
  onRateDoctor: (id: number, newRating: number) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  image,
  specialization,
  Rate,
  rating,
  location,
  experience,
  availability,
  style,
  onRateDoctor,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  // useEffect(() => {
  //   setCurrentRating(rating);
  // }, [rating]);

  const handleRatingClick = (newRating: number) => {
    setCurrentRating(newRating);
    onRateDoctor(id, newRating);
  };

  const phoneNumber = '+919875658491'; // replace with the actual number

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleBookAppointment = () => {
    // Logic to book an appointment
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSekztdhSIjKpeosx8jtRaU-HJ6FeZgoWBZ7xAvJXECUo6A37g/viewform", "_blank");
// For demonstration, we'll just show an alert
    toast(`Booking appointment with ${name}`);
  }

  return (
    <Card className="w-full  max-w-4xl mx-auto shadow-md hover:shadow-xl transition duration-300 border border-gray-200 rounded-2xl overflow-hidden bg-white flex flex-col sm:flex-row" style={style}>
      {/* Profile Image */}
      <div className="flex-shrink-0 p-4 flex justify-center sm:justify-start">
        <img
          src={image}
          alt={name}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Doctor Info */}
      <CardContent className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

          <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
            <span>{specialization}</span>
            <div className="flex items-center text-amber-500">
              <Star size={14} className="fill-current" />
              <span className="ml-1 text-xs">{Rate}</span>
            </div>
          </div>

          <p className="flex items-center text-sm text-gray-600 mt-2">
            <MapPin className="w-4 h-4 mr-1 text-green-600" />
            {location}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Experience: {experience} years
          </p>

          <p className="text-sm text-gray-500">Availability: {availability}</p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-col sm:items-start sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button className="w-full sm:w-auto px-5 py-2 rounded-lg shadow-sm"  onClick={handleCall}>
            Call Now
          </Button>

          <Button onClick={handleBookAppointment} className="w-full sm:w-auto px-4 py-2 rounded-lg shadow-sm">
            Book Appointment
          </Button>
          </div>

          <div className=" ml-10 flex items-center gap-2 text-sm text-gray-700">
            <StarRating value={currentRating} onRate={handleRatingClick} />
            <span className="text-xs text-gray-600">({currentRating.toFixed(1)})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
      

function toast(message: string) {
  const toastContainer = document.createElement("div");
  toastContainer.textContent = message;
  toastContainer.style.position = "fixed";
  toastContainer.style.bottom = "20px";
  toastContainer.style.right = "20px";
  toastContainer.style.backgroundColor = "#333";
  toastContainer.style.color = "#fff";
  toastContainer.style.padding = "10px 20px";
  toastContainer.style.borderRadius = "5px";
  toastContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
  toastContainer.style.zIndex = "1000";
  toastContainer.style.opacity = "0";
  toastContainer.style.transition = "opacity 0.6s";

  document.body.appendChild(toastContainer);

  // Fade in
  setTimeout(() => {
    toastContainer.style.opacity = "1";
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toastContainer.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toastContainer);
    }, 300);
  }, 3000);
}

export default DoctorCard;

