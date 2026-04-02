import React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import Process from "../components/Process";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Contacts from "../components/Contacts";
import BookingForm from "../components/BookingForm";
import Footer from "../components/Footer";

const IndexPage: React.FC = () => (
  <Layout>
    <Header />
    <Hero />
    <Benefits />
    <Services />
    <Process />
    <Reviews />
    <FAQ />
    <Contacts />
    <BookingForm />
    <Footer />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Барбершоп — стильные стрижки рядом с вами</title>
    <meta
      name="description"
      content="Современная парикмахерская: стрижки, укладки и уход для мужчин и женщин. Запись за минуту."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <html lang="ru" />
  </>
);
