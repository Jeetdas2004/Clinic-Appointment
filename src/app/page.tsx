"use client";

import React, { useState, useEffect } from "react";
import Landing from "./components/HomeComponents/Landing";
import Services, { ServiceItem } from "./components/HomeComponents/Services";
import About from "./components/HomeComponents/About";
import Doctors from "./components/HomeComponents/Doctors";
import Appointments from "./components/Appointments";
import { getDoctors } from "./DataFunction/Dctors";
import { getServices } from "./DataFunction/Service";
import { useDispatch } from "react-redux";
import { doctorAcrtions } from "@/redux/doctorSlice";
import { ServiceActions } from "@/redux/ClinicServiceSlice";
import { TbDental, TbMedicineSyrup } from "react-icons/tb";
import { GiMedicalDrip } from "react-icons/gi";
import { CiMedicalClipboard } from "react-icons/ci";
import { BsLungsFill, BsHeartPulseFill } from "react-icons/bs";

export default function Home() {
  const dispatch = useDispatch();
  const [appointmentModalVisible, setAppointmentModalVisible] = useState<boolean>(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch doctors and services into Redux store on initial load
    getDoctors().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        dispatch(doctorAcrtions.setDoctors(res));
      }
    });

    getServices().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        dispatch(ServiceActions.setServices(res));
      }
    });
  }, [dispatch]);

  const handleOpenAppointmentModal = (doctorId?: string) => {
    if (doctorId) {
      setPreselectedDoctorId(doctorId);
    } else {
      setPreselectedDoctorId(null);
    }
    setAppointmentModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Appointment Modal */}
      <Appointments
        visible={appointmentModalVisible}
        setVisible={setAppointmentModalVisible}
        selectedDoctorId={preselectedDoctorId}
      />

      {/* Hero Section */}
      <Landing
        setVisible={setAppointmentModalVisible}
        visible={appointmentModalVisible}
      />

      {/* Services Section */}
      <Services onBookService={() => handleOpenAppointmentModal()}>
        <ServiceItem index={1} information="Dental Care">
          <TbDental className="text-2xl sm:text-3xl" />
        </ServiceItem>
        <ServiceItem index={2} information="Cardiology">
          <BsHeartPulseFill className="text-2xl sm:text-3xl" />
        </ServiceItem>
        <ServiceItem index={3} information="Pulmonology">
          <BsLungsFill className="text-2xl sm:text-3xl" />
        </ServiceItem>
        <ServiceItem index={4} information="Pharmacy">
          <TbMedicineSyrup className="text-2xl sm:text-3xl" />
        </ServiceItem>
        <ServiceItem index={5} information="Pediatrics">
          <CiMedicalClipboard className="text-2xl sm:text-3xl" />
        </ServiceItem>
        <ServiceItem index={6} information="Neurology">
          <GiMedicalDrip className="text-2xl sm:text-3xl" />
        </ServiceItem>
      </Services>

      {/* About Section */}
      <About />

      {/* Doctors Section */}
      <Doctors onSelectDoctor={(docId) => handleOpenAppointmentModal(docId)} />
    </div>
  );
}
