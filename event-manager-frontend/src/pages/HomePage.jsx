import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Calendar, Users, MapPin, Phone, Mail, Clock, Heart, Music, Cake, Building, PartyPopper, Camera,
  Star, Award, Shield, Zap, ArrowRight, Play, CheckCircle, MessageCircle, Facebook, Instagram, Twitter, Linkedin
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // For hero section animation

  // Event images carousel data - Now with image paths
  // In a real application, these would likely come from an API or a CMS.
  const eventImages = [
    {
      id: 1,
      title: "Vibrant Birthday Celebrations",
      description: "Creating unforgettable moments that last a lifetime.",
      icon: <Cake className="w-12 h-12 text-white" />,
      image: "https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg", // Placeholder image path
      alt: "Birthday event celebration",
    },
    {
      id: 2,
      title: "Dynamic Live Music Events",
      description: "Concerts and performances that move hearts and souls.",
      icon: <Music className="w-12 h-12 text-white" />,
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg", // Placeholder image path
      alt: "Live music concert",
    },
    {
      id: 3,
      title: "Energetic Corporate Events",
      description: "Professional gatherings that inspire and connect.",
      icon: <Building className="w-12 h-12 text-white" />,
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg", // Placeholder image path
      alt: "Corporate conference",
    },
    {
      id: 4,
      title: "Joyful Wedding Celebrations",
      description: "Your perfect day planned to absolute perfection.",
      icon: <Heart className="w-12 h-12 text-white" />,
      image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg", // Placeholder image path
      alt: "Wedding reception",
    },
    {
      id: 5,
      title: "Grand Festival Events",
      description: "Large-scale celebrations that bring communities together.",
      icon: <PartyPopper className="w-12 h-12 text-white" />,
      image: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg", // Placeholder image path
      alt: "Outdoor festival",
    },
    {
      id: 6,
      title: "Professional Photography",
      description: "Capturing every precious moment with artistic excellence.",
      icon: <Camera className="w-12 h-12 text-white" />,
      image: "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg", // Placeholder image path
      alt: "Event photography session",
    }
  ];

  // Animation on scroll and Carousel auto-play
  useEffect(() => {
    setIsVisible(true); // Trigger hero section animation on mount
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer); // Clear interval on unmount
  }, [eventImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventImages.length) % eventImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Features data
  const features = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "5-Star Service",
      description: "Rated excellence by 10,000+ satisfied clients, ensuring every detail is perfected."
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: "Award Winning",
      description: "Industry recognition for outstanding event management and innovative solutions."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Fully Insured",
      description: "Complete protection and peace of mind with comprehensive event insurance coverage."
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance and emergency support throughout your event planning."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Bride",
      eventDate: "June 2024",
      eventType: "Wedding",
      content: "EventFlow made our wedding absolutely magical. Every detail was perfect, from the floral arrangements to the seamless timeline. Truly stress-free!",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-600 to-indigo-700"
    },
    {
      name: "Michael Chen",
      role: "Corporate Executive",
      eventDate: "May 2024",
      eventType: "Product Launch",
      content: "Outstanding professionalism from the EventFlow team. Our product launch was a tremendous success, exceeding all our expectations. Highly recommend!",
      rating: 5,
      avatar: "bg-gradient-to-br from-indigo-600 to-blue-700"
    },
    {
      name: "Emily Rodriguez",
      role: "Birthday Celebrant",
      eventDate: "April 2024",
      eventType: "30th Birthday Party",
      content: "They turned my vision into reality! The decorations, the music, the food – everything for my 30th birthday party was spot on. Best party ever!",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-700 to-purple-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
          {/* Hero Content */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Your Event, Our Expertise:
              </span>
              <br />
              Seamlessly Orchestrated Memories.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your special moments into extraordinary experiences with Eventify - where every detail matters and every dream becomes reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="group bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center justify-center">

        Start Planning Today

 <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />

</a>


 <a href="#about" className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 inline-flex items-center justify-center">

 <Play className="w-5 h-5 mr-2 inline-block" />

Watch Our Story

</a>
            </div>
          </div>

          {/* Enhanced Carousel - Now with Images */}
          <div id='events' className="relative w-full max-w-5xl mx-auto mt-16">
            <div className="relative h-96 md:h-[500px] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>

              {/* Carousel Content */}
              <div className="relative h-full overflow-hidden">
                {eventImages.map((event, index) => (
                  <div
                    key={event.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide ? 'translate-x-0 opacity-100' :
                      index < currentSlide ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                    }`}
                  >
                    <div className="h-full relative flex items-center justify-center p-8 overflow-hidden">
                      {/* Image Background */}
                      <img
                        src={event.image}
                        alt={event.alt}
                        className="absolute inset-0 w-full h-full object-cover brightness-75" // Darken image for text
                      />
                      {/* Overlay for readability */}
                      <div className="absolute inset-0 bg-black/40"></div>

                      <div className="text-center relative z-10">
                        <div className="flex justify-center mb-8 transform animate-bounce">
                          {event.icon}
                        </div>
                        <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white`}>
                          {event.title}
                        </h2>
                        <p className={`text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed`}>
                          {event.description}
                        </p>
                        {/* Accent button - using blue-900 for text as per theme */}
                        <a href="#testimonials" className="group bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center justify-center">

Learn More
<ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />

</a>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {eventImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white scale-125 shadow-lg'
                        : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Colors adjusted for Blue & Gold Theme */}
      <section className="py-20 bg-white">
        <div id='services' className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Why Choose Eventify?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that professional event management can make
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Us Section - Colors adjusted for Blue & Gold Theme */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div id='about' className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-2xl">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-5xl font-bold text-gray-800 mb-4">About Eventify</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pioneering event excellence since 2018
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Creating Unforgettable Moments
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  Eventify stands as the pinnacle of event management excellence, where creativity meets precision and dreams transform into reality. Our award-winning team of visionaries and logistics experts work tirelessly to craft experiences that transcend the ordinary.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  From intimate gatherings to grand celebrations, from corporate milestones to personal dreams, we orchestrate every detail with meticulous care and artistic flair.
                  <br /><br />
                  Our streamlined process ensures your peace of mind: We start with a **free consultation** to grasp your vision, then deliver a comprehensive **tailored proposal**. Once approved, our dedicated team dives into **meticulous planning** – from venue sourcing and vendor coordination to intricate decor and entertainment booking. On the big day, we provide **flawless on-site execution**, managing every element so you can relax and enjoy. Our legacy is built on trust, innovation, and the countless smiles we've created.
                </p>
                <div className="flex items-center text-blue-700 font-semibold text-lg">
                  <Calendar className="w-6 h-6 mr-3" />
                  Transforming Visions into Extraordinary Realities
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 shadow-inner">
                <h4 className="text-2xl font-bold text-gray-800 mb-6">Our Impact</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
                    <div className="text-gray-600">Events Perfected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-700 mb-2">10K+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-700 mb-2">50+</div>
                    <div className="text-gray-600">Expert Team</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-800 mb-2">6+</div>
                    <div className="text-gray-600">Years Excellence</div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <Award className="w-6 h-6 text-amber-500 mr-2" />
                    <h5 className="font-semibold text-gray-800">Industry Recognition</h5>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Winner of "Best Event Management Company 2023" and "Excellence in Customer Service Award"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Colors adjusted for Blue & Gold Theme */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div id='testimonials' className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-300 to-yellow-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Real stories from real people who trusted us with their special moments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-white font-bold text-lg mr-4`}>
                    {testimonial.name[0]} {/* Display first letter of name */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role} | {testimonial.eventType} {testimonial.eventDate}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section - Colors adjusted for Blue & Gold Theme */}
      <section className="py-20 bg-white">
        <div id='contact' className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-2xl">
                  <Phone className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-5xl font-bold text-gray-800 mb-4">Let's Create Magic Together</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to transform your vision into an extraordinary reality? Our expert team is here to make it happen.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">Email</h4>
                      <p className="text-gray-600">hello@eventify.com</p>
                      <p className="text-sm text-gray-500">Response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">Visit Us</h4>
                      <p className="text-gray-600">123 Event Avenue, Sector 18<br />Pune, Maharashtra, India</p> {/* Updated with Pune as per context */}
                      <p className="text-sm text-gray-500">Free consultation available by appointment</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">Business Hours</h4>
                      <p className="text-gray-600">Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</p>
                      <p className="text-sm text-gray-500">Extended hours during active event periods</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 shadow-inner">
                <h4 className="text-2xl font-bold text-gray-800 mb-6">The Eventify Advantage</h4>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Dedicated event coordinator for every project</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Custom solutions tailored to your unique vision and budget</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>24/7 client support and emergency assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Award-winning team of creative professionals and logistics experts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive vendor network for all event needs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Full event insurance and liability coverage for peace of mind</span>
                  </li>
                </ul>

                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <MessageCircle className="w-6 h-6 text-blue-600 mr-2" />
                    <h5 className="font-semibold text-gray-800">Free Consultation</h5>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Schedule a complimentary consultation to discuss your event vision and receive a personalized proposal.
                  </p>
                  <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 shadow-md">
                    Book Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* Footer Section - Enhanced Professional Version */}
      <footer className="bg-gradient-to-br from-blue-950 to-gray-900 text-gray-300 py-16"> {/* Darker gradient background, increased vertical padding */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8"> {/* Increased spacing between columns for larger screens */}
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-6">Eventify</h3> {/* Larger, bolder heading for company name */}
            <p className="text-gray-400 leading-relaxed mb-6"> {/* Slightly lighter text color for body, better line height */}
              Crafting unforgettable moments, from concept to flawless execution. Your dream event, our expertise.
            </p>
            <div className="flex space-x-5"> {/* Increased spacing for social icons */}
              <a href="https://facebook.com/eventify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-7 h-7" /> {/* Slightly larger icons */}
              </a>
              <a href="https://instagram.com/eventify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="https://twitter.com/eventify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-7 h-7" />
              </a>
              <a href="https://linkedin.com/company/eventify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="w-7 h-7" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3> {/* Consistent heading style, increased mb */}
            <ul className="space-y-3"> {/* Increased space between list items */}
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Services</a></li> {/* Link to a dedicated services page */}
              <li><a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">About Us</a></li> {/* Link to a dedicated about us page */}
              <li><a href="#testimonials" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Testimonials</a></li> {/* Link to a dedicated testimonials page */}
              <li><a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Contact</a></li> {/* Link to a dedicated contact page */}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3> {/* Consistent heading style, increased mb */}
            <ul className="space-y-3">
              <li><a href="#events" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Weddings</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Corporate Events</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Birthday Parties</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Concerts & Festivals</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Photography & Videography</a></li>
              {/* Add more service links as needed */}
            </ul>
          </div>

          {/* Contact Info */}
          <div id='contact'>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3> {/* Removed unnecessary 'contact' class, increased mb */}
            <p className="flex items-center mb-3 text-gray-400"> {/* Increased mb for paragraphs, consistent text color */}
              <MapPin className="w-5 h-5 mr-3 text-amber-500" /> 123 Event Avenue, Sector 18, Pune, MH 411001
            </p>
            <p className="flex items-center mb-3 text-gray-400">
              <Phone className="w-5 h-5 mr-3 text-amber-500" /> +91 98765 43210
            </p>
            <p className="flex items-center text-gray-400">
              <Mail className="w-5 h-5 mr-3 text-amber-500" /> info@eventify.com
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm"> {/* Increased top margin for copyright section, consistent border */}
          <p>&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
          <p className="mt-3"> {/* Increased top margin for privacy/terms links */}
            <a href="/privacy-policy" className="hover:underline px-3">Privacy Policy</a> | {/* Increased horizontal padding for separator effect */}
            <a href="/terms-of-service" className="hover:underline px-3">Terms of Service</a> |
            <a href="/sitemap" className="hover:underline px-3">Sitemap</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;