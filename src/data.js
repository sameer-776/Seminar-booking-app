import { Wind, Video, Mic, Users, Tv, Settings, Star } from 'lucide-react';

export const SEMINAR_HALLS = [
  "VIP Lounge",
  "Basement seminar hall",
  "Ground Floor seminar hall",
  "1st Floor seminar hall",
  "2nd Floor seminar hall",
  "3rd Floor seminar hall",
  "4th Floor seminar hall",
  "5th Floor seminar hall",
  "6th Floor seminar hall"
];

export const HALL_FACILITIES = {
  "VIP Lounge": [
    { name: "Luxury Sofa Seating", icon: Star, description: "For executive meetings, guest interviews, or podcasts.", capacity: 50 },
    { name: "Podcast & Recording Setup", icon: Mic, description: "Equipped with high-quality microphones." },
    { name: "4K Display Screen", icon: Tv, description: "Ultra high-definition screen for presentations." },
    { name: "Climate Control AC", icon: Wind, description: "Fully air-conditioned with precise control." },
  ],
  "Basement seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Accommodates up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned for comfort." },
    { name: "Projector System", icon: Video, description: "Standard HD projector for presentations." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and microphone setup." },
  ],
  "Ground Floor seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Customizable seating for up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Centrally air-conditioned." },
    { name: "Large Screen Projector", icon: Video, description: "High-definition, large-format projection." },
    { name: "Advanced Audio & Mic System", icon: Mic, description: "State-of-the-art sound system." },
  ],
  "1st Floor seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Accommodates up to 300 guests.", capacity: 300 },
    { name: "Smart Interactive Board", icon: Tv, description: "Engage your audience with our interactive smart board." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and microphone setup." },
    { name: "Video Conferencing", icon: Video, description: "Equipped for seamless remote meetings." },
  ],
  "2nd Floor seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Accommodates up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Dual HD Projectors", icon: Video, description: "Dual projectors for enhanced visibility." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and microphone setup." },
  ],
  "3rd Floor seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Accommodates up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Projector System", icon: Video, description: "Standard HD projector." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and microphone setup." },
  ],
  "4th Floor seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Accommodates up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Projector System", icon: Video, description: "Standard HD projector." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and microphone setup." },
  ],
  "5th Floor seminar hall": [
    { name: "Seating Capacity", icon: Users, description: "Accommodates up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Smart Interactive Board", icon: Tv, description: "Interactive smart board with a projector." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and microphone setup." },
  ],
  "6th Floor seminar hall": [
    { name: "Luxury Seating", icon: Users, description: "Premium seating for up to 300 guests.", capacity: 300 },
    { name: "Air Conditioning", icon: Wind, description: "Climate-controlled environment." },
    { name: "4K Projector System", icon: Video, description: "Ultra high-definition 4K projector." },
    { name: "Premium Audio System", icon: Mic, description: "Surround sound and high-fidelity microphones." },
  ]
};