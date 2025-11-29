import React from 'react'

import { StarIcon, ClockIcon, UsersIcon, HeartIcon, TrophyIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'

const About = () => {
  const teamMembers = [
    {
      name: "Chef Marco",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=300&fit=crop",
      bio: "15+ years of culinary experience specializing in Italian cuisine"
    },
    {
      name: "Sarah Chen",
      role: "Nutritionist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      bio: "Registered dietitian focused on healthy and delicious meal planning"
    },
    {
      name: "Alex Rodriguez",
      role: "Recipe Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Creative recipe innovator with passion for fusion cuisine"
    },
    {
      name: "Dr. Emily Watson",
      role: "Food Scientist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      bio: "PhD in Food Science ensuring nutritional accuracy and safety"
    }
  ]

  const stats = [
    { icon: UsersIcon, number: "50K+", label: "Happy Cooks" },
    { icon: StarIcon, number: "4.9", label: "Average Rating" },
    { icon: ClockIcon, number: "500+", label: "Recipes" },
    { icon: TrophyIcon, number: "15", label: "Awards Won" }
  ]

  const values = [
    {
      icon: HeartIcon,
      title: "Passion for Food",
      description: "We believe every meal should be an experience worth remembering"
    },
    {
      icon: ShieldCheckIcon,
      title: "Quality First",
      description: "Only the finest ingredients and tested recipes make it to your kitchen"
    },
    {
      icon: UsersIcon,
      title: "Community Driven",
      description: "Built by cooks, for cooks. Your feedback shapes our platform"
    },
    {
      icon: TrophyIcon,
      title: "Excellence",
      description: "Constantly innovating to bring you the best culinary experiences"
    }
  ]

  return (
    <div className="min-h-screen bg-white">

      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            About Tamato
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Where passion for food meets culinary innovation
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Tamato was born from a simple idea: everyone deserves to eat well, regardless of their cooking skills. 
                What started as a small collection of family recipes has grown into a vibrant community of food lovers.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Our mission is to demystify cooking and make gourmet meals accessible to home cooks everywhere. 
                We believe that great food brings people together and creates lasting memories.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we're proud to serve thousands of cooking enthusiasts with tested recipes, 
                expert tips, and a supportive community that celebrates culinary creativity.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop" 
                alt="Our kitchen"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-2xl font-bold">Since 2018</p>
                <p className="text-orange-100">Serving food lovers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By The Numbers</h2>
            <p className="text-gray-600 text-lg">Our impact in the culinary world</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The passionate food experts behind Tamato</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full px-6 lg:px-16 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            To inspire and empower home cooks around the world to create delicious, 
            nutritious meals that bring joy to their tables and strengthen their connections with loved ones.
          </p>
          <div className="bg-orange-500 text-white rounded-2xl p-8">
            <p className="text-2xl font-bold mb-4">"Good food is the foundation of genuine happiness."</p>
            <p className="text-orange-100">- The Tamato Team</p>
          </div>
        </div>
      </div>

    


    </div>
  )
}

export default About