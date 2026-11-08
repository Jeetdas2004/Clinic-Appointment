import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  children?: ReactNode;
};

const ServicesDeatlis = ({ children }: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      {children}
    </div>
  );
};

export default ServicesDeatlis;

export const Service = ({
  title,
  description,
  tagline,
  children,
  index,
  onBook,
}: {
  title: string;
  description: string;
  tagline?: string;
  children: ReactNode;
  index: number;
  onBook?: () => void;
}) => {
  const currentService = useSelector((state: { service: { currentService: number } }) => state.service.currentService);
  const isActive = index === currentService;

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8 flex-col md:flex-row items-center gap-8 ${
        isActive ? 'flex' : 'hidden'
      }`}
    >
      <div className="w-full md:w-5/12 h-64 relative rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
        {children}
      </div>
      <div className="w-full md:w-7/12 flex flex-col items-start gap-4">
        {tagline && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
            {tagline}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          {onBook && (
            <button
              onClick={onBook}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-colors cursor-pointer"
            >
              Book {title}
            </button>
          )}
          <a
            href="#doctors"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
          >
            Find Specialist
          </a>
        </div>
      </div>
    </div>
  );
};
