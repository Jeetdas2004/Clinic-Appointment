import React, { ReactNode } from 'react';
import { FaUserMd, FaHeartbeat, FaClock } from 'react-icons/fa';

type Props = {
  children?: ReactNode;
};

const ClinicFeatures = ({ children }: Props) => {
  if (children) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
        {children}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
      <Feature
        icon={<FaClock className="text-amber-300 text-xl" />}
        number="24/7"
        information="Emergency Care"
      />
      <Feature
        icon={<FaUserMd className="text-cyan-300 text-xl" />}
        number="80+"
        information="Specialist Doctors"
      />
      <Feature
        icon={<FaHeartbeat className="text-emerald-300 text-xl" />}
        number="100K+"
        information="Happy Patients"
      />
    </div>
  );
};

export default ClinicFeatures;

export const Feature = ({
  number,
  information,
  icon,
}: {
  number: string;
  information: string;
  icon?: ReactNode;
}) => {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-xl shadow-xs hover:bg-white/15 transition-all">
      {icon && <div className="p-2 rounded-lg bg-white/10 shrink-0">{icon}</div>}
      <div className="flex flex-col">
        <h3 className="font-extrabold text-white text-2xl tracking-tight leading-tight">{number}</h3>
        <p className="text-xs text-blue-100 font-medium leading-normal">{information}</p>
      </div>
    </div>
  );
};
