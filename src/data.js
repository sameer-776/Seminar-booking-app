import { Wind, Video, Mic, Users, Tv, Armchair, Columns, ShieldAlert } from 'lucide-react';

export const SEMINAR_HALLS = [
  "Basement Seminar Hall",
  "Ground Floor Seminar Hall",
  "1st Floor Seminar Hall",
  "2nd Floor Seminar Hall",
  "3rd Floor Seminar Hall",
  "4th Floor Seminar Hall",
  "5th Floor Seminar Hall",
  "6th Floor Seminar Hall",
  "VIP Lounge"
];

export const HALL_FACILITIES = {
  "Basement Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
    { name: "Tables with Seats", icon: Columns },
  ],
  "Ground Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
    { name: "Restriction", icon: ShieldAlert, description: "Reserved for VIP/VVIP events only." },
  ],
  "1st Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
    { name: "Tables with Seats", icon: Columns },
  ],
  "2nd Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
    { name: "Tables with Seats", icon: Columns },
  ],
  "3rd Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
  ],
  "4th Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
  ],
  "5th Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
  ],
  "6th Floor Seminar Hall": [
    { name: "Capacity: 200", icon: Users, capacity: 200 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Projector & Screen", icon: Video },
    { name: "Podium & Microphone", icon: Mic },
    { name: "Video Conferencing", icon: Tv },
    { name: "Tables with Seats", icon: Columns },
  ],
  "VIP Lounge": [
    { name: "Capacity: 10", icon: Users, capacity: 10 },
    { name: "Air Conditioning", icon: Wind },
    { name: "Luxury Sofa Seating", icon: Armchair },
    { name: "4K Display Screen", icon: Tv },
    { name: "Premium Audio", icon: Mic },
    { name: "Restriction", icon: ShieldAlert, description: "Reserved for external guests only." },
  ]
};