"use client";

import React, { ReactNode, useMemo } from 'react';
import Image from 'next/image';
import clinicLogo from '../../../../public/clinicLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceActions } from '../../../redux/ClinicServiceSlice';
import ServicesDeatlis, { Service } from './ServiceDeatlis';
import { ServiceType } from '@/app/Types';
import { TbDental, TbMedicineSyrup } from 'react-icons/tb';
import { GiMedicalDrip } from 'react-icons/gi';
import { CiMedicalClipboard } from 'react-icons/ci';
import { BsLungsFill, BsHeartPulseFill } from 'react-icons/bs';

type Props = {
  children?: ReactNode;
  onBookService?: (serviceName: string) => void;
};

const defaultServicesIcons: Record<string, ReactNode> = {
  dental: <TbDental className="text-3xl" />,
  cardio: <BsHeartPulseFill className="text-3xl" />,
  lungs: <BsLungsFill className="text-3xl" />,
  pharmacy: <TbMedicineSyrup className="text-3xl" />,
  pediatrics: <CiMedicalClipboard className="text-3xl" />,
  neuro: <GiMedicalDrip className="text-3xl" />,
};

const Services = ({ children, onBookService }: Props) => {
  const rawServices = useSelector((state: { service: { services: ServiceType[] } }) => state.service.services);
  const services = useMemo(() => rawServices || [], [rawServices]);

  const displayServices = useMemo(() => {
    if (!Array.isArray(services) || services.length === 0) {
      return null;
    }
    return services.map((service: ServiceType, ind: number) => {
      return (
        <Service
          key={service._id || ind}
          index={ind + 1}
          title={service.name}
          tagline={service.tagline}
          description={service.description}
          onBook={() => onBookService && onBookService(service.name)}
        >
          <img
            src={service.logo}
            alt={service.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </Service>
      );
    });
  }, [services, onBookService]);

  return (
    <section id="services" className="py-12 bg-slate-50/70 backdrop-blur-xs border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <Image src={clinicLogo} alt="" width={20} height={20} className="object-contain" />
            <span>Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Specialized Medical Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            Choose from comprehensive clinical departments equipped with certified doctors, modern diagnostic equipment, and tailored treatment plans.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 pt-6 pb-2 max-w-4xl mx-auto">
          {children || (
            services.map((srv, idx) => (
              <ServiceItem
                key={srv._id || idx}
                index={idx + 1}
                information={srv.name.split(' ')[0]}
              >
                {defaultServicesIcons[srv.icon || 'dental'] || <TbDental className="text-3xl" />}
              </ServiceItem>
            ))
          )}
        </div>

        {/* Selected Service Detail Display */}
        <ServicesDeatlis>
          {displayServices}
        </ServicesDeatlis>
      </div>
    </section>
  );
};

export default Services;

export const ServiceItem = ({
  children,
  information,
  index,
}: {
  children: ReactNode;
  information: string;
  index: number;
}) => {
  const currentService = useSelector(
    (state: { service: { currentService: number } }) => state.service.currentService
  );
  const dispatch = useDispatch();
  const isSelected = currentService === index;

  return (
    <button
      onClick={() => {
        dispatch(ServiceActions.updateService(index));
      }}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors duration-100 cursor-pointer shadow-2xs border ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-blue-50/70 hover:text-blue-600'
      }`}
    >
      <div className={isSelected ? 'text-white' : 'text-blue-600'}>
        {children}
      </div>
      <span>{information}</span>
    </button>
  );
};
