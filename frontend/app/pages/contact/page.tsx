"use client";
import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/solid'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  // Map locations - Updated with Lahore
  const locations = [
    {
      id: 1,
      name: "Lahore Headquarters",
      position: [31.5204, 74.3587], // Lahore, Pakistan
      address: "123 Food Street, Gulberg, Lahore, Pakistan",
      phone: "+92 42 123 4567"
    },
    {
      id: 2,
      name: "Karachi Office",
      position: [24.8607, 67.0011], // Karachi, Pakistan
      address: "456 Culinary Avenue, Clifton, Karachi, Pakistan",
      phone: "+92 21 123 4568"
    },
    {
      id: 3,
      name: "Islamabad Branch",
      position: [33.6844, 73.0479], // Islamabad, Pakistan
      address: "789 Recipe Lane, F-7, Islamabad, Pakistan",
      phone: "+92 51 123 4569"
    }
  ]

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Call Us",
      details: "+92 42 123 4567",
      description: "Mon to Fri from 9am to 6pm",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      details: "support@tamato.com",
      description: "Send us your queries anytime",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MapPinIcon,
      title: "Visit Us",
      details: "3 Locations in Pakistan",
      description: "Visit our offices",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: ClockIcon,
      title: "Business Hours",
      details: "Monday - Saturday",
      description: "9:00 AM - 7:00 PM PKT",
      color: "bg-orange-100 text-orange-600"
    }
  ]

  const faqs = [
    {
      question: "How can I submit my own recipe?",
      answer: "You can submit your recipes through our 'Submit Recipe' form. Our team reviews all submissions within 48 hours."
    },
    {
      question: "Do you provide nutritional information?",
      answer: "Yes! All our recipes include detailed nutritional information and can be customized based on dietary needs."
    },
    {
      question: "Can I request a specific type of recipe?",
      answer: "Absolutely! We love hearing from our community. Use the contact form to suggest recipe ideas."
    },
    {
      question: "Are the recipes suitable for beginners?",
      answer: "Yes, we categorize recipes by difficulty level and provide step-by-step instructions with videos."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Let's create something amazing together.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="w-full px-6 lg:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Methods</h2>
            <p className="text-gray-600 text-lg">Choose your preferred way to reach us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-700 font-semibold mb-2">{method.details}</p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us Across Pakistan</h2>
            <p className="text-gray-600 text-lg">Visit our offices in major cities</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="h-96 w-full rounded-xl overflow-hidden">
              <MapContainer 
                center={[31.5204, 74.3587]} // Centered on Lahore
                zoom={6} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location) => (
                  <Marker key={location.id} position={location.position}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg text-orange-600">{location.name}</h3>
                        <p className="text-gray-700 text-sm mt-1">{location.address}</p>
                        <p className="text-gray-600 text-sm mt-1">{location.phone}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            
            {/* Location List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {locations.map((location) => (
                <div key={location.id} className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-700 text-lg mb-2">{location.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                  <p className="text-gray-700 font-semibold text-sm">{location.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="w-full px-6 lg:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <span className="flex items-center justify-center">
                    Send Message
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <MapPinIcon className="w-8 h-8 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Locations in Pakistan</h2>
                </div>
                
                <div className="space-y-6">
                  {locations.map((location) => (
                    <div key={location.id} className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{location.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{location.address}</p>
                      <p className="text-orange-600 font-semibold text-sm mt-1">{location.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <DevicePhoneMobileIcon className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Need Immediate Help?</h3>
                </div>
                <p className="text-orange-100 mb-4">
                  Our support team is available to assist you with any urgent matters.
                </p>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">+92 42 123 HELP</p>
                  <p className="text-orange-100 text-sm">24/7 Emergency Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Still have questions?{" "}
              <button className="text-orange-600 font-semibold hover:text-orange-700 underline">
                View all FAQs
              </button>
            </p>
          </div>
        </div>
      </div>

    
    </div>
  )
}

export default Contact