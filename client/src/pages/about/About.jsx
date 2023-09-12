import React from "react"
import Back from "../../components/common/Back"
import Heading from "../../components/common/Heading"
import img from "../../components/images/about.jpg"
import "./about.css"
import Footer from "../../components/common/footer/Footer"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />

            <p>At RentoMe, we believe that vacations should be a memorable and enjoyable experience for everyone. This is why we have created an online vacation rental platform in Tunisia that makes it easier to book accommodation for your next vacation.

            Our platform offers a variety of accommodation options to meet the needs of all travelers, from private apartments and luxury villas to guesthouses and residences. We have a careful selection of properties offered on our platform to ensure that all our guests enjoy a comfortable and memorable stay.</p>
            <p>We have worked hard to make booking a holiday to Tunisia as easy as possible for our customers. On our website, you can search for properties based on your search criteria, browse photos and reviews to help you make your choice, and book securely online.</p>
            <p>Notre équipe est composée de professionnels expérimentés dans le secteur de l’hospitalité et de l’industrie du voyage. Nous sommes passionnés par la Tunisie et nousavons à cœur de partager notre amour pour ce pays avec nos clients. Nous sommes toujours prêts à vous aider à planifier votre voyage, que ce soit pour des vacances en famille, un séjour romantique ou un voyage d’affaires. Nous pouvons vous aider à trouver les meilleures propriétés pour vos besoins, à organiser des activités sur place et à répondre à toutes vos questions.</p>
            <p>We are also proud of our commitment to protecting your privacy and keeping your data secure. We have implemented security measures to protect your personal information and we comply with applicable privacy laws and regulations.

In summary, at Boky we are committed to providing you with an exceptional Tunisia travel experience, offering you a large selection of properties, an easy booking process and superior customer service. Please do not hesitate to contact us if you have any questions or concerns, we are here to help you plan your next vacation to Tunisia</p>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default About
